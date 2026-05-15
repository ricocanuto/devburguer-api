//  * store => Cadastrar /Adicionar
//  * index => Listar vários
//  * show => Listar apenas um
//  * update => Atualizar
//  * delete => Deletar

import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import User from '../models/User.js';

class UserController {
  async store(request, response) {
    // Validação do corpo da requisição
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
      street: Yup.string(),
      number: Yup.string(),
      neighborhood: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zip_code: Yup.string(),
    });

    try {
      // Valida os dados da requisição
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const {
      name,
      email,
      password,
      admin,
      street,
      number,
      neighborhood,
      city,
      state,
      zip_code,
    } = request.body;

    // Verifica se o usuário já existe
    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    // Cria o novo usuário no banco de dados
    const user = await User.create({
      id: uuidv4(),
      name,
      email,
      password,
      admin,
      street,
      number,
      neighborhood,
      city,
      state,
      zip_code,
    });

    return response.status(201).json({
      id: user.id,
      name,
      email,
      admin,
      street,
      number,
      neighborhood,
      city,
      state,
      zip_code,
    });
  }

  async index(_request, response) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'admin'],
    });

    return response.json(users);
  }
}

export default new UserController();
