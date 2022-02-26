import { Router } from 'express';
import categoriesRoutes from './categories.routes';

const routes = Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});
routes.use('/categories', categoriesRoutes);

export default routes;
