import { Request, Response } from 'express';
import * as rentalsService from '../services/rentalsService';
import NotFound from '../errors/NotFoundError';

export async function insert(req: Request, res: Response) {
  try {
    await rentalsService.insert(req.body);
    return res.sendStatus(201);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(error.status).send(error.message);
    }
    return res.sendStatus(500);
  }
}
export async function list(req: Request, res: Response) {
  const { filter } = res.locals;
  try {
    const rentals = await rentalsService.list(filter);
    return res.send(rentals);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(error.status).send(error.message);
    }
    console.error(error.message);
    return res.sendStatus(500);
  }
}
