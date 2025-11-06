import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // Adjust path if needed

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const users = [
      {
        username: "admin",
        email: "admin@employeeportal.com",
        password: "AdminPass123",
      },
      {
        username: "manager",
        email: "manager@employeeportal.com",
        password: "ManagerPass123",
      },
      {
        username: "employee",
        email: "employee@employeeportal.com",
        password: "EmployeePass123",
      },
    ];

    // Hash passwords before saving
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    // Clear existing users before seeding (optional but clean)
    await User.deleteMany({});
    await User.insertMany(hashedUsers);

    console.log("✅ Users seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
