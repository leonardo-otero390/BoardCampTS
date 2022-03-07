import { Request, Response, NextFunction } from 'express';

export function validateParams(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { filter } = res.locals;
  filter.customerId = 0;
  filter.gameId = 0;
  if (req.query.customerId) {
    filter.customerId = Number(req.query.customerId);
  }
  if (req.query.gameId) {
    filter.gameId = Number(req.query.gameId);
  }
  if (Number.isNaN(filter.customerId) || Number.isNaN(filter.gameId)) {
    return res.sendStatus(400);
  }
  return next();
}
