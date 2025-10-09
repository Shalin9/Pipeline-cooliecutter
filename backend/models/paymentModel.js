import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipientName: { type: String, required: true },
  recipientAccount: { type: String, required: true },
  bank: { type: String, required: true },
  country: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Payment", paymentSchema);
