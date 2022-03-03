import { Router } from 'express';
import * as customersController from '../controllers/customersController';
import * as customersValidation from '../validations/customersValidation';

const routes = Router();

routes.post(
  '/',
  customersValidation.validateCustomer,
  customersController.insert,
);
routes.get('/', customersController.list);
routes.get('/:id', customersController.findById);
routes.put(
  '/:id',
  customersValidation.validateCustomerUpdate,
  customersController.update,
);

export default routes;
