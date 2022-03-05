import { Request, Response } from 'express';
import * as rentalsService from '../services/rentalsService';
import NotFound from '../errors/NotFoundError';
import BadRequest from '../errors/BadRequestError';

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
    return res.sendStatus(500);
  }
}
export async function finish(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.sendStatus(400);
  try {
    await rentalsService.finish(id);
    return res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    if (error instanceof NotFound) {
      return res.status(error.status).send(error.message);
    }
    if (error instanceof BadRequest) {
      return res.status(error.status).send(error.message);
    }
    return res.sendStatus(500);
  }
}
