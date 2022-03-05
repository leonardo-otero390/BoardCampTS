import { Router } from 'express';
import * as rentalsController from '../controllers/rentalsController';
import * as rentalsValidation from '../validations/rentalsValidation';

const routes = Router();

routes.post('/', rentalsValidation.validateNewRental, rentalsController.insert);
routes.get('/', rentalsValidation.validateParams, rentalsController.list);
routes.post('/:id/return', rentalsController.finish);

export default routes;
