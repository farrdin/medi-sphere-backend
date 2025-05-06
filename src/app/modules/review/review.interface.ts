import { Document, Types } from 'mongoose';

export interface TUser {
  _id: Types.ObjectId;
  email: string;
  name?: string;
}

export interface TReview extends Document {
  products: {
    product: Types.ObjectId;
    name: string;
  }[];
  user: { _id: Types.ObjectId; name: string; email: string };
  rating: number;
  comment?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
