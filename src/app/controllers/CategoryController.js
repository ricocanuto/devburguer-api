import Category from '../models/Category.js';
import User from '../models/User.js';
import * as Yup from 'yup';

class CategoryController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const user = await User.findByPk(request.userId);

        // Verificamos se o usuário existe ANTES de acessar .admin
        if (!user || !user.admin) {
            return response.status(401).json({ error: 'Acesso negado: Usuário não é administrador' });
        }
        
        const { filename: path } = request.file;
        const { name } = request.body;

        const categoryExists = await Category.findOne({
            where: { name },
        });
        
        if(categoryExists) {
            return response.status(400).json({ error: 'Category already exists' });
        }

        const { id } = await Category.create({
            name,
            path,
        });

        return response.status(201).json({ id, name });
    }

    async update(request, response) {
        const schema = Yup.object({
            name: Yup.string(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        
        const user = await User.findByPk(request.userId);

        if (!user || !user.admin) {
            return response.status(401).json({ error: 'Acesso negado: Usuário não é administrador' });
        }
        
        const { name } = request.body;
        const { id } = request.params; 

        let path;
        if (request.file) {
            const { filename } = request.file;
            path = filename;
        }

        // Buscamos a categoria pelo ID antes de atualizar
        const category = await Category.findByPk(id);

        if (!category) {
            return response.status(404).json({ error: 'Category not found' });
        }

        // Se estiver tentando mudar o nome, checa se o novo nome já existe em outra categoria
        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({ where: { name } });
            if (existingCategory) {
                return response.status(400).json({ error: 'Category name already exists' });
            }
        }

        await Category.update(
            { name, path },
            { where: { id } }
        );

        return response.status(200).json({ message: 'Category updated successfully' });
    }

    async index(_request, response) {
        const categories = await Category.findAll();
        return response.status(200).json(categories);
    }
}

export default new CategoryController();