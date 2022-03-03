import { Request, Response } from 'express';
import * as customersService from '../services/customersService';
import Conflict from '../errors/ConflictError';
import NoContent from '../errors/NoContentError';
import { validatecpf } from '../validations/customersValidation';

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
export async function list(req: Request, res: Response) {
  const { cpf } = req.query;
  let cpfString = '';
  if (cpf) {
    if (!validatecpf(cpf.toString())) return res.sendStatus(400);
    cpfString += cpf;
  }

  try {
    const customers = await customersService.list(cpfString);
    return res.send(customers);
  } catch (error) {
    if (error instanceof NoContent) return res.status(error.status).send([]);
    return res.sendStatus(500);
  }
}
