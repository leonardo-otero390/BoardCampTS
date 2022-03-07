import { Router } from 'express';
import * as gamesController from '../controllers/gamesController';
import { validateGame } from '../middlewares/validateGame';

const routes = Router();

routes.get('/', gamesController.list);
routes.post('/', validateGame, gamesController.insert);

export default routes;
