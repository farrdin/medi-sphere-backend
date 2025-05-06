import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Medicine } from '../medicine/medicine.model';
import Review from './review.model';

const createReview = async (
  user: { _id: string; name: string; email: string },
  payload: {
    products: { product: string; rating?: number; comment?: string }[];
  },
  ip: string,
) => {
  if (!payload?.products?.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'No products to review');
  }

  const reviews = await Promise.all(
    payload.products.map(async (item) => {
      const product = await Medicine.findById(item.product);
      if (!product) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Product ${item.product} not found`,
        );
      }

      return await Review.create({
        product: item.product,
        user,
        rating: item.rating ?? 5,
        comment: item.comment ?? '',
        ip,
      });
    }),
  );

  return reviews;
};

const getReviews = async (email?: string) => {
  let data = await Review.find().populate('product').exec();

  if (email) {
    data = data.filter((review) => review.user?.email === email);
  }

  return data;
};

export const reviewService = {
  createReview,
  getReviews,
};
