import mongoose, {Schema} from "mongoose";

export interface IProduct extends mongoose.Document {
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const ProductsSchema = new Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  image: {type: String, required: true, default: "default.png"},
  createdAt: {type: Date, default: Date.now()},
});

export default mongoose.model<IProduct>("Product", ProductsSchema);
