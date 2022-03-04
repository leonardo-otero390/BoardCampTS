import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const newRentalSchema = joi.object({
  customerId: joi.number().required(),
  gameId: joi.number().required(),
  daysRented: joi.number().min(1).required(),
});

export function validateNewRental(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validation = newRentalSchema.validate(req.body);
  if (validation.error) return res.sendStatus(400);
  return next();
}
