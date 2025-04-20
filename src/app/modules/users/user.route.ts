// ✅ BACKEND - user.route.ts
import express from 'express';
import { updateUser as updateUserController } from './user.controller'; // Adjust the import path as necessary
import { Request, Response } from 'express';
import { NextFunction } from 'express';


const router = express.Router();


export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Your update logic here
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        next(error);
    }
};

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateUserController(req, res, next);
    } catch (error) {
        next(error);
    }
}); // PATCH /users/:id

export const userRoutes = router;
