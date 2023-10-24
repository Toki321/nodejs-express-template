import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../database/user.model';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, username } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).send({ message: 'User with this email or username already exists.' });
    }

    const user: IUser = new User({
      email,
      username,
    });

    await user.save();

    res.status(201).send({ message: 'User created successfully!', user });
  } catch (err: unknown) {
    next(err);
  }
};
