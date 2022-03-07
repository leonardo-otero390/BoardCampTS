import { Router } from 'express';
import * as gamesController from '../controllers/gamesController';
import validateFilters from '../middlewares/validateFilters';
import { validateGame } from '../middlewares/validateGame';

const routes = Router();

routes.get('/', validateFilters, gamesController.list);
routes.post('/', validateGame, gamesController.insert);

export default routes;
