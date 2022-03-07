import { Router } from 'express';
import * as customersController from '../controllers/customersController';
import validateFilters from '../middlewares/validateFilters';
import validateSchema from '../middlewares/validateSchema';
import * as customersSchemas from '../schemas/customerSchemas';

const routes = Router();

routes.post(
  '/',
  validateSchema(customersSchemas.customer),
  customersController.insert,
);
routes.get('/', validateFilters, customersController.list);
routes.get('/:id', customersController.findById);
routes.put(
  '/:id',
  validateSchema(customersSchemas.customerUpdate),
  customersController.update,
);

export default routes;
