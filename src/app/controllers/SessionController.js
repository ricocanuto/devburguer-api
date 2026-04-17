import * as Yup from 'yup';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

class SessionController {
    async store(request, response) {
        // Define o esquema de validação do Yup
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

         try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      const errors = err.inner.map(e => e.message);
      return response.status(400).json({ errors });
    }

    const { email, password } = request.body;

        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
        // Logar no terminal ajuda você a saber que o e-mail não foi achado
        console.log(`Tentativa de login: Usuário ${email} não encontrado.`);
        return response.status(401).json({ error: 'Credenciais inválidas' });
    }

    if (!(await user.checkPassword(password))) {
        console.log(`Tentativa de login: Senha incorreta para o e-mail ${email}.`);
        return response.status(401).json({ error: 'Credenciais inválidas' });
    }

        const token = jwt.sign({ id: user.id, name: user.name, admin: user.admin },
            authConfig.secret,{ expiresIn: authConfig.expiresIn });

        return response.json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            token
         });
    }
}

export default new SessionController();


