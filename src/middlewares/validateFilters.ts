import { Request, Response, NextFunction } from 'express';

export default function validateFilters(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const filter = { offset: 0, limit: 0 };
  if (req.query.offset) {
    filter.offset = Number(req.query.offset);
  }
  if (req.query.limit) {
    filter.limit = Number(req.query.limit);
  }
  if (Number.isNaN(filter.offset + filter.limit)) {
    return res.sendStatus(400);
  }
  res.locals.filter = filter;
  return next();
}
