import { Request, Response, NextFunction } from 'express';
import User from './User'; // Adjust path if needed

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find(); // This fetches all users from MongoDB
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // returns the updated user instead of the original one
      runValidators: true, // ensures that validators are run during the update
    });
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
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(401).json({ message: errorMessage });
  }
};
