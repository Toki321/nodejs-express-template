import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Handle default error
  res.status(500).json({ error });
};

export default errorHandler;
