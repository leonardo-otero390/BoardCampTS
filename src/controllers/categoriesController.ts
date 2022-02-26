import { Request, Response } from 'express';
import * as categoriesService from '../services/categoriesService';
import NoContent from '../errors/NoContentError';

export async function list(req: Request, res: Response) {
  try {
    const categories = await categoriesService.list();
    return res.send(categories);
  } catch (error) {
    if (error instanceof NoContent) {
      return res.status(error.status).send([]);
    }
    if (error.status) return res.sendStatus(error.status);

    return res.sendStatus(500);
  }
}
