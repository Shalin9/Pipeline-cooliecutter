import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3, maxlength: 20 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 }
});

export default mongoose.model("User", userSchema);
/*
---------------------------------
Reference List (Harvard Style)
---------------------------------
MongoDB (2024) *MongoDB Manual – Data Modeling and Schema Validation.* Available at: https://www.mongodb.com/docs/manual/core/data-model-design/

Mongoose (2024) *Mongoose Documentation – Schema Definition and Validation.* Available at: https://mongoosejs.com/docs/guide.html

Mozilla Developer Network (MDN) (2024) *JavaScript Reference – Objects and Data Types.* Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript

Node.js (2024) *Node.js Documentation – Modules and ES6 Import/Export Syntax.* Available at: https://nodejs.org/api/esm.html
*/
