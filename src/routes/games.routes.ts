import { Router } from 'express';
import * as gamesController from '../controllers/gamesController';
import * as gamesValidation from '../validations/gamesValidation';

const routes = Router();

routes.post('/', gamesValidation.validateGame, gamesController.insert);

export default routes;
