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

        const { admin: isAdmin } = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json();
        }

        const { filename: path } = request.file; // Pegamos o nome do arquivo enviado.
        const { name } = request.body;

        const categoryExists = await Category.findOne({
            where: {
                name,
            },
        });
        
        if(categoryExists) {
            return response.status(400).json({ error: 'Category already exists' });
        }

        const { id } = await Category.create({
            name,
            path, // Salve o path aqui para a categoria ter foto.
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
         const { name } = request.body;

         let path
         if ( request.file ){
            const { filename } = request.file;
            path = filename
         }

         const existingCategory = await Category.findOne({
            where: {
                name,
            },
         });
         if (existingCategory) {
            return response.status(400).json({ error: 'Category already exists'});
         }

         const newCategory = await Category.update({
            name,
            path,
         });

         return response.status(201).json(newCategory);
        
    }

    async index(_request, response) {
        const categories = await Category.findAll();

        return response.status(200).json(categories);
    }
    }

export default new CategoryController();