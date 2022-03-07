import { Router } from 'express';
import * as rentalsController from '../controllers/rentalsController';
import validateFilters from '../middlewares/validateFilters';
import { validateParams } from '../middlewares/validateRentalParams';
import validateSchema from '../middlewares/validateSchema';
import * as rentalsSchemas from '../schemas/rentalsSchemas';

const routes = Router();

routes.post(
  '/',
  validateSchema(rentalsSchemas.newRental),
  rentalsController.insert,
);
routes.get('/', validateFilters, validateParams, rentalsController.list);
routes.post('/:id/return', rentalsController.finish);
routes.delete('/:id', rentalsController.remove);

export default routes;
