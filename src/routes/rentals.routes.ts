import { Router } from 'express';
import * as rentalsController from '../controllers/rentalsController';
import * as rentalsValidation from '../validations/rentalsValidation';

const routes = Router();

routes.post('/', rentalsValidation.validateNewRental, rentalsController.insert);

export default routes;
