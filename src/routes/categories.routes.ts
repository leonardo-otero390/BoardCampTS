import { Router } from 'express';
import * as categoriesController from '../controllers/categoriesController';
import validateFilters from '../middlewares/validateFilters';
import validateSchema from '../middlewares/validateSchema';
import { name } from '../schemas/categoriesSchemas';

const routes = Router();

routes.get('/', validateFilters, categoriesController.list);
routes.post('/', validateSchema(name), categoriesController.insert);

export default routes;
