import { Request, Response, NextFunction } from 'express';
import * as customersService from '../services/customersService';
import { validatecpf } from '../validations/customersValidation';

export async function insert(req: Request, res: Response, next: NextFunction) {
  const customer = req.body;
  try {
    await customersService.insert(customer);
    return res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
}
export async function list(req: Request, res: Response, next: NextFunction) {
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
    return next(error);
  }
}
export async function findById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.sendStatus(400);
  try {
    const customer = await customersService.findById(id);
    return res.send(customer);
  } catch (error) {
    return next(error);
  }
}
export async function update(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.sendStatus(400);
  try {
    const customer = await customersService.findById(id);
    const updated = { ...customer, ...req.body };
    await customersService.update(updated);
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
}
