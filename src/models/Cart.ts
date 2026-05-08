import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: {
    type: String, // We'll use the user's email or ID
    required: true,
    unique: true,
  },
  items: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      img: { type: String, required: true },
      selectedSize: { type: String, required: true },
      qty: { type: Number, required: true, default: 1 },
    }
  ]
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
