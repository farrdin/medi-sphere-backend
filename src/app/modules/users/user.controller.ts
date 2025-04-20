// ✅ BACKEND - user.controller.ts
import { Request, Response } from 'express';
import User from '../users/User'; // your mongoose user model

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateUser = async (req: Request, res: Response, next: unknown) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    
    res.status(500).json({ message: 'Failed to update user', error });
  }
};
