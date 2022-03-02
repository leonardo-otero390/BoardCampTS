import { Request, Response } from 'express';
import * as customersService from '../services/customersService';
import Conflict from '../errors/ConflictError';

export async function insert(req: Request, res: Response) {
  const customer = req.body;
  try {
    await customersService.insert(customer);
    return res.sendStatus(201);
  } catch (error) {
    if (error instanceof Conflict) {
      return res.status(error.status).send(error.message);
    }
    return res.sendStatus(500);
  }
}
