import { Router } from 'express';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';

const orderRouter = Router();
enum UserRole {
  user = 'user',
  admin = 'admin',
}

orderRouter.get('/verify', auth(UserRole.user), orderController.verifyPayment);

orderRouter
  .route('/')
  .post(auth(UserRole.user), orderController.createOrder)
  .get(auth(UserRole.user), orderController.getOrders);

export default orderRouter;
