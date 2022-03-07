import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/HttpError';
import NoContent from '../errors/NoContentError';

export default function serverError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpError) {
    return res.status(err.status).send(err.message);
  }
  if (err instanceof NoContent) {
    return res.status(err.status).send([]);
  }
  res.sendStatus(500);
  return next();
}
