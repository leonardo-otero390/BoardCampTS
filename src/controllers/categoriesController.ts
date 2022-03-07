import { Request, Response, NextFunction } from 'express';
import * as categoriesService from '../services/categoriesService';

export async function list(req: Request, res: Response, next: NextFunction) {
  const { filter } = res.locals;
  try {
    const categories = await categoriesService.list(filter);
    return res.send(categories);
  } catch (error) {
    return next(error);
  }
}

export async function insert(req: Request, res: Response, next: NextFunction) {
  try {
    await categoriesService.insert(req.body.name);
    return res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
}
