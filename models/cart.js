import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    cart: [],
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", userSchema, "carts");
