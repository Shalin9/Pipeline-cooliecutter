// models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  recipientName: { type: String, required: true },
  recipientAccount: { type: String, required: true },
  bank: { type: String, required: true },
  country: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;

/*
References (Harvard Style):

Mongoose (2024) *Mongoose documentation: Schemas and Models.* Available at: https://mongoosejs.com/docs/guide.html

Node.js Foundation (2024) *Node.js v22.0.0 Documentation.* Available at: https://nodejs.org/en/docs/

MongoDB Inc. (2024) *MongoDB Developer Documentation.* Available at: https://www.mongodb.com/docs/
*/
