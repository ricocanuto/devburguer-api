import * as Yup from 'yup';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

class OrderController {
    async store(request, response) {
        const schema = Yup.object({
            products: Yup.array()
                .required()
                .of(
                    Yup.object({
                        id: Yup.number().required(),
                        quantity: Yup.number().required(),
                    }),
                ),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false, strict: true });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { userId, userName } = request;
        const { products } = request.body;

        const productIds = products.map((product) => product.id);

        const findedProducts = await Product.findAll({
            where: {
                id: productIds,
            },
            include: {
                model: Category,
                as: 'category',
                attributes: ['name'],
            },
        });

        const mapedProducts = findedProducts.map((product) => {
            const quantity = products.find((p) => p.id === product.id).quantity;

            return {
                id: product.id,
                name: product.name,
                price: product.price,
                url: product.url,
                category: product.category.name,
                quantity,
            };
        });

        const order = {
            user: {
                id: userId,
                name: userName,
            },
            products: mapedProducts,
            status: 'Pedido realizado',
        };

        return response.status(201).json(order);
    }

    async index(request, response) {
        return response.json({
            message: 'Pedidos realizados',
        });
    }

    async update(request, response) {
        return response.json({
            message: 'Pedido em preparação',
        });
    }
}

export default new OrderController();