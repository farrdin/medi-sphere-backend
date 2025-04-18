import { Router } from 'express';
import { medicineRoutes } from '../modules/medicine/medicine.route';
import authRouter from '../modules/auth/auth.routes';
import orderRouter from '../modules/order/order.router';
const router = Router();

const moduleRoutes = [
  {
    path: '/medicines',
    route: medicineRoutes,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/orders',
    route: orderRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
