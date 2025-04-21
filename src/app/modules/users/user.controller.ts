import { Request, Response, NextFunction } from 'express';
import User from './User'; // Adjust path if needed

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateUser = async (
  req: Request,
  res: Response,
  next: unknown,
) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true },
    );
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(updatedUser); // Send the updated user object back
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Send the current user data back
  } catch (error) {
    next(error);
  }
};

import jwt from 'jsonwebtoken'; // If using JWT for authentication

// Authentication middleware to populate `req.user`
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'id' in decoded &&
      'name' in decoded &&
      'email' in decoded &&
      'role' in decoded
    ) {
      req.user = decoded as {
        id: string;
        name: string;
        email: string;
        role: 'user' | 'admin';
      };
    } else {
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
};
