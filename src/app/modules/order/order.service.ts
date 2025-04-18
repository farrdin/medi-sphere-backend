import { Medicine } from '../medicine/medicine.model';
import { TOrder } from './order.interface';
import Order from './order.model';

const createOrder = async (payload: TOrder): Promise<TOrder> => {
  const result = await Order.create(payload);

  const product = await Medicine.findById(payload.product);

  if (product) {
    const newQuantity = product.quantity - payload.quantity;
    const updateData = {
      quantity: newQuantity,
      inStock: newQuantity > 0,
    };

    await Medicine.findByIdAndUpdate(payload.product, updateData);

    // console.log(newQuantity);
  }

  return result;
};

const orderRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return result[0]?.totalRevenue || 0;
};

export const orderService = {
  createOrder,
  orderRevenue,
};
