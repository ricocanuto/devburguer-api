import { Router } from 'express';

const routes = new Router();

routes.get('/', (request, response) => {
    return response.status(200).json({ message: 'Hello world!' });
});

export default routes;
