import { Router } from 'express';
import * as categoriesController from '../controllers/categoriesController';

const routes = Router();

routes.get('/', categoriesController.list);

export default routes;
