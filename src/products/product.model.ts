import * as mongoose from 'mongoose';
import { User } from '../auth/schemas/users.schema';
export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  user: {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
});

export interface Product extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
  user:User
}
