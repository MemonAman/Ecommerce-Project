import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  cat: { type: String, required: true },
  price: { type: Number, required: true },
  orig: { type: Number, default: null },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  tag: { type: String, default: '' },
  colors: { type: [String], required: true },
  sizes: { type: [String], required: true },
  img: { type: String, required: true },
  gallery: { type: [String], default: [] },
  desc: { type: String, required: true },
  gender: { type: String, enum: ['man', 'woman', 'unisex'], required: true },
  style: { type: String, enum: ['casual', 'formal', 'party', 'gym'], required: true },
}, {
  timestamps: true,
});

// Use existing model if available (prevents recompilation error in Next.js dev)
const Product = models.Product || model('Product', ProductSchema);

export default Product;
