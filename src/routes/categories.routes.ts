import { Router } from 'express';
import * as categoriesController from '../controllers/categoriesController';
import * as categoriesValidation from '../validations/categoriesValidation';

const routes = Router();

routes.get('/', categoriesController.list);
routes.post(
  '/',
  categoriesValidation.validateName,
  categoriesController.insert,
);

export default routes;
