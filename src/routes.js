import { Router } from 'express';
import multer from 'multer';

import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import ProductController from './app/controllers/ProductController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';

import adminMiddleware from './app/middlewares/admin.js';
import authMiddleware from './app/middlewares/auth.js';
import multerConfig from './config/multer.js';

const routes = new Router();

const upload = multer(multerConfig);

// Rotas de Usuário e Sessão (Públicas)
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
// Rotas de Produtos
routes.post('/products', adminMiddleware, upload.single('file'), ProductController.store,);
routes.get('/products', ProductController.index);
routes.put('/products/:id', adminMiddleware, upload.single('file'), ProductController.update,);
// Rotas de Categorias
routes.post('/categories', adminMiddleware, upload.single('file'), CategoryController.store,);
routes.get('/categories', CategoryController.index);
routes.put('/categories/:id', adminMiddleware, upload.single('file'), CategoryController.update,);
// Rotas de Pedidos (Orders)
routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

routes.get('/users', adminMiddleware, UserController.index);

export default routes;
