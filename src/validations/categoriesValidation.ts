import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const nameSchema = joi.object({
  name: joi.string().required(),
});

export function validateName(req: Request, res: Response, next: NextFunction) {
  const validation = nameSchema.validate(req.body);
  if (validation.error) return res.sendStatus(400);
  return next();
}
