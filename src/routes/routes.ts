import { Router } from 'express';
import categoriesRoutes from './categories.routes';
import gamesRoutes from './games.routes';
import customersRoutes from './customers.routes';
import rentalsRoutes from './rentals.routes';

const routes = Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});
routes.use('/categories', categoriesRoutes);
routes.use('/customers', customersRoutes);
routes.use('/games', gamesRoutes);
routes.use('/rentals', rentalsRoutes);

export default routes;
