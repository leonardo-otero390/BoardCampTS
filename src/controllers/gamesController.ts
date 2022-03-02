import { Request, Response } from 'express';
import * as gamesService from '../services/gamesService';
import Conflict from '../errors/ConflictError';
import NoContent from '../errors/NoContentError';
import NotFound from '../errors/NotFoundError';

export async function insert(req: Request, res: Response) {
  const { game } = res.locals;
  try {
    await gamesService.insert(game);
    return res.sendStatus(201);
  } catch (error) {
    if (error instanceof Conflict) {
      return res.status(error.status).send(error.message);
    }
    if (error instanceof NotFound) {
      return res.status(error.status).send(error.message);
    }
    return res.sendStatus(500);
  }
}
export async function list(req: Request, res: Response) {
  const gameName = req.query.name.toString();
  try {
    const games = await gamesService.list(gameName);
    return res.send(games);
  } catch (error) {
    console.log(error.message);
    if (error instanceof NoContent) return res.status(error.status).send([]);
    return res.sendStatus(500);
  }
}
