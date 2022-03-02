import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().pattern(/^\d{10,11}$/).required(),
  cpf: joi.string().pattern(/^\d{11}/).required(),
  birthday: joi.date().max('now').required(),
});

export function validateCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validation = customerSchema.validate(req.body);
  console.log(validation);
  if (validation.error) return res.sendStatus(400);
  // res.locals.game = game;
  return next();
}
