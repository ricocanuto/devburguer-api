import { Router } from 'express';
import multer from 'multer';

import CategoryController from './app/controllers/CategoryController';
import OrderController from './app/controllers/OrderController';
import ProductController from './app/controllers/ProductController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import adminMiddleware from './app/middlewares/admin';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

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

export default routes;
