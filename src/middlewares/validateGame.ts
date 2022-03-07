import { Request, Response, NextFunction } from 'express';
import { gameSchema } from '../schemas/gamesSchemas';

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
