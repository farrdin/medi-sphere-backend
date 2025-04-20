import { Router } from 'express';
import { medicineRoutes } from '../modules/medicine/medicine.route';
import authRouter from '../modules/auth/auth.routes';
import orderRouter from '../modules/order/order.router';
import stockRouter from '../modules/stocks/stock.route'; // Import the stockRouter
import { userRoutes } from '../modules/users/user.route';
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

  {
    path: '/stocks',  
    route: stockRouter,  
  },
  {
    path: '/users', // 
    route: userRoutes,
  },


];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
