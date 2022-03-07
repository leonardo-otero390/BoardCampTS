import { Request, Response, NextFunction } from 'express';

export default function validateSchema(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) return res.sendStatus(400);
    return next();
  };
}
