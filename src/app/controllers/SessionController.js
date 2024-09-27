import * as Yup from 'yup';
import User from '../models/User';
import jwt from 'jsonwebtoken';

class SessionController {
    async store(request, response) {
        // Define o esquema de validação do Yup
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        // Tenta validar o corpo da requisição
        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ 
                error: 'Validation fails', 
                messages: err.errors 
            });
        }

        const { email, password } = request.body;

        // Verifica se o usuário existe
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return response.status(401).json({
                error: 'Make sure your email or password is correct',
            });
        }

        // Verifica se a senha é correta
        const isSamePassword = await user.checkPassword(password);

        if (!isSamePassword) {
            return response.status(401).json({
                error: 'Make sure your email or password is correct',
            });
        }

        // Retorna o token JWT e os dados do usuário
        return response.json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            token: jwt.sign({ id: user.id }, 'a7ffba05ad6baa669f62e96e890bb3dd', {
                expiresIn: '5d',
            }),
        });
    }
}

export default new SessionController();