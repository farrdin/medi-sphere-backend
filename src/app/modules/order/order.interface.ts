import { Document, Types } from 'mongoose';

export interface TOrder extends Document {
  user: { _id: Types.ObjectId; name: string; email: string };
  products: { product: Types.ObjectId; name: string; quantity: number }[];
  deliveryType: 'standard' | 'express';
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
