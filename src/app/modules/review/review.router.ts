import { Router } from 'express';
import { reviewController } from './review.controller';

const reviewRouter = Router();

reviewRouter.post('/', reviewController.createReview);
reviewRouter.get('/', reviewController.getReviews);

export default reviewRouter;
