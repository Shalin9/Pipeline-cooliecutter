// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

/*
References (Harvard Style):

Mongoose (2024) *Mongoose documentation: Schemas and Models.* Available at: https://mongoosejs.com/docs/guide.html

Node.js Foundation (2024) *Node.js v22.0.0 Documentation.* Available at: https://nodejs.org/en/docs/

MongoDB Inc. (2024) *MongoDB Developer Documentation.* Available at: https://www.mongodb.com/docs/
*/
