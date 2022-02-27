import { Request, Response } from 'express';
import * as gamesService from '../services/gamesService';
import Conflict from '../errors/ConflictError';

export async function insert(req: Request, res: Response) {
  const { game } = res.locals;
  try {
    await gamesService.insert(game);
    return res.sendStatus(201);
  } catch (error) {
    if (error instanceof Conflict) {
      return res.status(error.status).send(error.message);
    }
    return res.sendStatus(500);
  }
}
