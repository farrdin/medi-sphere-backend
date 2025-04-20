// ✅ BACKEND - user.route.ts
import express, { Request, Response, NextFunction } from 'express';
import { getSingleUser, getAllUsers, getCurrentUser, updateUser } from './user.controller'; // Ensure getCurrentUser is added to the controller

const router = express.Router();

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
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

export const userRoutes = router;
export default router;
