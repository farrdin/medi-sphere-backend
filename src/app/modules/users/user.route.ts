/* eslint-disable @typescript-eslint/no-explicit-any */
// ✅ BACKEND - user.route.ts
import express, { Request, Response, NextFunction } from 'express';
import {
  getSingleUser,
  getAllUsers,
  getCurrentUser,
  updateUser,
} from './user.controller'; // Ensure getCurrentUser is added to the controller
import User from './User';

const router = express.Router();

router.get(
  '/email/:email',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
);

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true },
    );

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 GET /users/me (To fetch current user data)
router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getCurrentUser(req, res, next); // This will handle fetching the current logged-in user
  } catch (error) {
    next(error);
  }
});

// 🔹 GET /users/:id (Get single user data)
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getSingleUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

// 🔹 GET /users (Get all users)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAllUsers(req, res, next);
  } catch (error) {
    next(error);
  }
});

// 🔹 PATCH /users/:id (Update user data)
router.patch(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateUser(req, res, next);
    } catch (error) {
      next(error);
    }
  },
);

export const userRoutes = router;
