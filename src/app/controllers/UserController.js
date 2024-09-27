
//  * store => Cadastrar /Adicionar
//  * index => Listar vários
//  * show => Listar apenas um
//  * update => Atualizar
//  * delete => Deletar

import { v4 } from 'uuid';
import * as Yup from 'yup';
import bcrypt from 'bcrypt'; // Adiciona bcrypt para hashing de senha

import User from '../models/User';

class UserController {
  async store(request, response) {
    // Validação do corpo da requisição
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(), // Valida password e não password_hash
      admin: Yup.boolean(),
    });

    try {
      // Valida os dados da requisição
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, email, password, admin } = request.body;

    // Verifica se o usuário já existe
    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    // Cria o hash da senha
    const password_hash = await bcrypt.hash(password, 10);

    // Cria o novo usuário no banco de dados
    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });

    return response.status(201).json({
      id: user.id,
      name,
      email,
      admin,
    });
  }
}

export default new UserController();
