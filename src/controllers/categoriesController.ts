import { Request, Response } from 'express';
import * as categoriesService from '../services/categoriesService';
import NoContent from '../errors/NoContentError';
import Conflict from '../errors/ConflictError';

export async function list(req: Request, res: Response) {
  try {
    const categories = await categoriesService.list();
    return res.send(categories);
  } catch (error) {
    if (error instanceof NoContent) return res.status(error.status).send([]);
    return res.sendStatus(500);
  }
}

export async function insert(req: Request, res: Response) {
  try {
    await categoriesService.insert(req.body.name);
    return res.sendStatus(201);
  } catch (error) {
    if (error instanceof Conflict) {
      return res.status(error.status).send(error.message);
    }
    return res.sendStatus(500);
  }
}
