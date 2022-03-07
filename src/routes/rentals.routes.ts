import { Router } from 'express';
import * as rentalsController from '../controllers/rentalsController';
import { validateParams } from '../middlewares/validateRentalParams';
import validateSchema from '../middlewares/validateSchema';
import * as rentalsSchemas from '../schemas/rentalsSchemas';

const routes = Router();

routes.post(
  '/',
  validateSchema(rentalsSchemas.newRental),
  rentalsController.insert,
);
routes.get('/', validateParams, rentalsController.list);
routes.post('/:id/return', rentalsController.finish);
routes.delete('/:id', rentalsController.remove);

export default routes;
