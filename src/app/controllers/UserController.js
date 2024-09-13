
//  * store => Cadastrar /Adicionar
//  * index => Listar vários
//  * show => Listar apenas um
//  * update => Atualizar
//  * delete => Deletar
 

import { v4 } from 'uuid';

import User from '..//models/User';

class UserController {
    async store(request, response) {
        const {name, email, password_hash, admin } = request.body;

        const user = await User.create({
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
