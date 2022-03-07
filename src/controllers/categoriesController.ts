import { Request, Response, NextFunction } from 'express';
import * as categoriesService from '../services/categoriesService';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await categoriesService.list();
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
