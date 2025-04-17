import { Router } from 'express';
import { medicineRoutes } from '../modules/medicine/medicine.route';
import authRouter from '../modules/auth/auth.routes';
const router = Router();

const moduleRoutes = [
  {
    path: '/medicines',
    route: medicineRoutes,
  },
  {
    path: '/api/auth',
    route: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
