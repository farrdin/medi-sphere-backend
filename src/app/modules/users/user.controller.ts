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
    const userId = req.user?._id; // assuming `req.user` is populated by auth middleware

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

// ✅ Add the authenticate middleware in case you don't have it in another file

import jwt from 'jsonwebtoken'; // If using JWT for authentication

// Authentication middleware to populate `req.user`
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Verify the token using your secret key
    req.user = decoded; // Attach user data (decoded) to the request object
    next(); // Continue to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
