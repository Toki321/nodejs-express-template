import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
});

export const validateUserBody = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    next(error);
  }

  next();
};
