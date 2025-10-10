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
/*
---------------------------------
Reference List (Harvard Style)
---------------------------------
MongoDB (2024) *MongoDB Manual – Data Modeling and Schema Design.* Available at: https://www.mongodb.com/docs/manual/core/data-model-design/

Mongoose (2024) *Mongoose Documentation – Schemas and Models.* Available at: https://mongoosejs.com/docs/guide.html

Mozilla Developer Network (MDN) (2024) *JavaScript Reference – Data Types and Date Objects.* Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript

Node.js (2024) *Node.js Documentation – Modules and ES6 Import/Export Syntax.* Available at: https://nodejs.org/api/esm.html
*/
