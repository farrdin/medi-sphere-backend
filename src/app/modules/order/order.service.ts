// import { TOrder } from './order.interface';
// import Order from './order.model';

// const createOrder = async (payload: TOrder): Promise<TOrder> => {
//   const result = await Order.create(payload);

//   const product = await Product.findById(payload.product);

//   if (product) {
//     const newQuantity = product.quantity - payload.quantity;
//     const updateData = {
//       quantity: newQuantity,
//       inStock: newQuantity > 0,
//     };

//     await Product.findByIdAndUpdate(payload.product, updateData);

//     console.log(newQuantity);
//   }

//   return result;
// };

// const orderRevenue = async () => {
//   const result = await Order.aggregate([
//     {
//       $group: {
//         _id: null,
//         totalRevenue: { $sum: '$totalPrice' },
//       },
//     },
//   ]);

//   return result[0]?.totalRevenue || 0;
// };

// export const orderService = {
//   createOrder,
//   orderRevenue,
// };

import { TOrder } from './order.interface'
import Order from './order.model'

// Dummy product data to simulate DB product
const dummyProduct = {
  _id: '1234567890abcdef12345678', // a fake ObjectId string
  name: 'City Cruiser',
  brand: 'Urban Riders',
  model: 'CC-Urban',
  price: 850,
  type: 'Hybrid',
  category: 'Commuter',
  description: 'Perfect for city commuting and leisure rides.',
  quantity: 22,
  inStock: true,
  isDeleted: false,
  img: 'https://cdn.pixabay.com/photo/2019/09/10/13/24/bicycle-4466113_1280.jpg',
}

const createOrder = async (payload: TOrder): Promise<TOrder> => {
  const result = await Order.create(payload)

  // Simulating product lookup
  const product = dummyProduct

  if (product) {
    const newQuantity = product.quantity - payload.quantity
    const updateData = {
      quantity: newQuantity,
      inStock: newQuantity > 0,
    }

    // Simulating product update
    dummyProduct.quantity = updateData.quantity
    dummyProduct.inStock = updateData.inStock

    // console.log('📦 Dummy product updated quantity:', newQuantity)
  }

  return result
}

const orderRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ])

  return result[0]?.totalRevenue || 0
}

export const orderService = {
  createOrder,
  orderRevenue,
}
