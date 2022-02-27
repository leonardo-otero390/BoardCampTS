import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const gameSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().trim().uri().required(),
  stockTotal: joi.number().required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().required(),
});

export function validateGame(req: Request, res: Response, next: NextFunction) {
  const game = {
    ...req.body,
    stockTotal: Number(req.body.stockTotal),
    pricePerDay: Number(req.body.pricePerDay),
  };
  const validation = gameSchema.validate(game);
  if (validation.error) return res.sendStatus(400);
  res.locals.game = game;
  return next();
}
