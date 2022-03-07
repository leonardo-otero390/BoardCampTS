import { Request, Response, NextFunction } from 'express';
import * as gamesService from '../services/gamesService';

export async function insert(req: Request, res: Response, next: NextFunction) {
  const { game } = res.locals;
  try {
    await gamesService.insert(game);
    return res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
}
export async function list(req: Request, res: Response, next: NextFunction) {
  const { name } = req.query;
  let nameString = '';
  if (name) nameString += name;
  try {
    const games = await gamesService.list(nameString);
    return res.send(games);
  } catch (error) {
    return next(error);
  }
}
