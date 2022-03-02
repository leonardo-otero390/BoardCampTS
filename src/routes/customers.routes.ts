import { Router } from 'express';
import * as customersController from '../controllers/customersController';
import * as customersValidation from '../validations/customersValidation';

const routes = Router();

routes.post(
  '/',
  customersValidation.validateCustomer,
  customersController.insert,
);

export default routes;
