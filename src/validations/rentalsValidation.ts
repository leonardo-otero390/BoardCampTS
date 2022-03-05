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
export function validateParams(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const filter = { customerId: 0, gameId: 0 };
  if (req.query.customerId) {
    filter.customerId = Number(req.query.customerId);
  }
  if (req.query.gameId) {
    filter.gameId = Number(req.query.gameId);
  }
  if (Number.isNaN(filter.customerId) || Number.isNaN(filter.gameId)) {
    return res.sendStatus(400);
  }
  res.locals.filter = filter;
  return next();
}
