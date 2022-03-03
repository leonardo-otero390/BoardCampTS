import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi
    .string()
    .pattern(/^\d{10,11}$/)
    .required(),
  cpf: joi
    .string()
    .pattern(/^\d{11}/)
    .required(),
  birthday: joi.date().max('now').required(),
});

export function validateCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validation = customerSchema.validate(req.body);
  if (validation.error) return res.sendStatus(400);
  return next();
}
export function validatecpf(cpf: string): Boolean {
  const schema = joi.string().pattern(/^\d{1,11}$/);
  const validation = schema.validate(cpf);
  if (validation.error) return false;
  return true;
}
