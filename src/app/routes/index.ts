import { Router } from 'express'
import orderRouter from '../modules/order/order.router'
const router = Router()

const moduleRoutes = [
  {
    path: '/orders',
    route: orderRouter,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
