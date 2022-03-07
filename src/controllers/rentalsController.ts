import { NextFunction, Request, Response } from 'express';
import * as rentalsService from '../services/rentalsService';

export async function insert(req: Request, res: Response, next: NextFunction) {
  try {
    await rentalsService.insert(req.body);
    return res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
}
export async function list(req: Request, res: Response, next: NextFunction) {
  const { filter } = res.locals;
  try {
    const rentals = await rentalsService.list(filter);
    return res.send(rentals);
  } catch (error) {
    return next(error);
  }
}
export async function finish(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.sendStatus(400);
  try {
    await rentalsService.finish(id);
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
}
export async function remove(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.sendStatus(400);
  try {
    await rentalsService.remove(id);
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
}
