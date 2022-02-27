import { Router } from 'express';
import categoriesRoutes from './categories.routes';
import gamesRoutes from './games.routes';

const routes = Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});
routes.use('/categories', categoriesRoutes);
routes.use('/games', gamesRoutes);

export default routes;
