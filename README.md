[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Zggxou2R)

# Customer Portal

A full-stack web application for managing users and payments securely. The project includes a React frontend and Node.js/Express backend with MongoDB integration, JWT authentication, password hashing, and basic input validation.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Input validation using regex patterns
- Payment creation and listing for authenticated users
- Protected API routes
- Responsive React frontend
- Basic DevSecOps pipeline (CI workflow included)

---

## Tech Stack

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** Helmet, Express Rate Limiter
- **DevOps:** GitHub Actions CI pipeline

---

## Prerequisites

- Node.js >= 18
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- Git

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/IIEWFL/insy7314-part-2-cooliecutters.git
cd insy7314-part-2-cooliecutters
Install backend dependencies:
cd backend
npm install
Install frontend dependencies:
cd ../frontend
npm install
Running the Application
Backend
Ensure .env file exists in the backend folder with:
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5001
Start backend server:
cd backend
npm run dev
Server runs on: http://localhost:5001
Frontend
Start frontend:
cd frontend
npm start
Frontend runs on: http://localhost:3000
⚠️ If using HTTPS locally, browsers may show a warning for self-signed certificates.
Environment Variables
Create a .env file in the backend folder with the following:
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5001
MONGO_URI – MongoDB connection string
JWT_SECRET – Secret for signing JWT tokens
PORT – Backend server port
Project Structure
customer-portal/
├─ backend/
│  ├─ models/           # MongoDB models (User, Payment)
│  ├─ routes/           # API routes
│  ├─ middleware/       # Authentication and security
│  ├─ server.js         # Express server entry point
│  ├─ package.json
│  └─ .env              # Environment variables
├─ frontend/
│  ├─ src/
│  │  ├─ pages/         # React pages (Dashboard, Payments, Login, Register)
│  │  ├─ utils/         # Axios API helper
│  │  ├─ App.js         # React router setup
│  │  └─ index.js
│  ├─ package.json
│  └─ README.md
└─ .github/
   └─ workflows/        # GitHub Actions CI pipeline
Security
Passwords are hashed with bcrypt before saving
Input validation using regex patterns for username, email, password, and payments
JWT authentication for protected routes
Helmet for setting secure HTTP headers
Express Rate Limiter to prevent brute-force attacks
HTTPS (self-signed for local development)
Contributing
Fork the repository.
Create a feature branch: git checkout -b feature/my-feature
Commit your changes: git commit -m "Add my feature"
Push to your branch: git push origin feature/my-feature
<<<<<<< HEAD
Open a Pull Request
=======
Open a Pull Request
>>>>>>> f22b4e1 (update from http to https)
