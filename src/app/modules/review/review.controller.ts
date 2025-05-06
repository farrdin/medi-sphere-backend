import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../errors/AppError';
import { reviewService } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const user = req.body.user || req.user;

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
  }

  const review = await reviewService.createReview(user, req.body, req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Review placed successfully',
    data: review,
  });
});

const getReviews = catchAsync(async (req, res) => {
  const email = req.query.email as string | undefined;
  const review = await reviewService.getReviews(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Review(s) retrieved successfully',
    data: review,
  });
});

export const reviewController = {
  createReview,
  getReviews,
};
