import { Router } from 'express';
import { medicineRoutes } from '../modules/medicine/medicine.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/medicines',
    route: medicineRoutes,
  },
  // {
  //   path: '/shop',
  //   route: medicineRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
