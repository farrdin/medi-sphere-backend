import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRouter from './app/modules/auth/auth.routes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// All API routes go here
app.use('/api/auth', authRouter); // Only one router for now

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.send('Medi-Sphere App Is Running');
});

export default app;
