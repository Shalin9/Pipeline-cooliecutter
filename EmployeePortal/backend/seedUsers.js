import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const users = [
      { username: "admin", email: "admin@employeeportal.com", password: "AdminPass123" },
      { username: "manager", email: "manager@employeeportal.com", password: "ManagerPass123" },
      { username: "employee", email: "employee@employeeportal.com", password: "EmployeePass123" },
    ];

    // Hash passwords
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    // Clear existing users and insert
    await User.deleteMany({});
    await User.insertMany(hashedUsers);

    console.log(
      "✅ Users seeded successfully:",
      hashedUsers.map((u) => ({ username: u.username, email: u.email }))
    );

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
