# 🏦 Customer Portal Project – INSY7314 POE

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-brightgreen)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 📖 Table of Contents
1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Setup Instructions](#setup-instructions)  
5. [Running the Application](#running-the-application)  
6. [Security & Rubric Implementation](#security--rubric-implementation)  
7. [DevSecOps Pipeline](#devsecops-pipeline)  
8. [Unit Testing (Input Whitelisting)](#unit-testing-input-whitelisting)  
9. [Screenshots](#screenshots)  
10. [Authors](#authors)  

---

## 🏗 Project Overview
The **Customer Portal** is a secure web application that allows users to register, log in, and perform payments to different recipients.  

The project emphasizes **security best practices** while providing a consistent and modern front-end theme with gradient backgrounds and clean UI components.

---

## ✨ Features
- **User Registration & Login**
  - Passwords hashed and salted with **bcrypt**
  - JWT-based authentication
- **Payments Portal**
  - Create and manage payments
  - Input validation and sanitization
- **Security**
  - HTTPS server for secure communication
  - Rate limiting via `express-rate-limit`
  - HTTP headers protection using `helmet`
  - Input whitelisting to prevent injections
- **Frontend Theme**
  - Animated gradient backgrounds
  - Consistent form and dashboard styling
- **DevSecOps Integration**
  - Automated security checks, linting, and unit testing

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Frontend:** React, React Router, Axios  
- **Authentication:** JWT, bcrypt  
- **Security Middleware:** Helmet, express-rate-limit, CORS  
- **DevSecOps & Testing:** Jest, GitHub Actions  

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js >= 22  
- npm >= 9  
- MongoDB installed locally or Atlas account  
- Google Chrome (recommended)  

### Backend Setup
```bash
cd backend
npm install
Frontend Setup
cd frontend
npm install
SSL Certificates (HTTPS)
The app uses HTTPS locally. Generate certificates with mkcert:
mkcert -install
mkcert localhost
Place the .pem and .key files in backend/cert/.
🚀 Running the Application
Backend
cd backend
npm run dev
Frontend
cd frontend
npm start
Visit: https://localhost:3000
You may need to accept the self-signed certificate once in Chrome.
🔒 Security & Rubric Implementation
Criteria	Implementation
Password Security	Passwords hashed with bcrypt and salted; JWT authentication used.
Input Whitelisting	Backend validates all form inputs using regex; frontend sanitizes input.
Securing Data (SSL)	HTTPS implemented with locally generated certificates.
Protecting Routes	Rate limiting with express-rate-limit; helmet headers applied; JWT middleware protects routes.
DevSecOps	GitHub Actions workflow runs automated tests, linting, and security audits on every push.
🧩 DevSecOps Pipeline
The project includes a GitHub Actions pipeline to automate security and testing:
File: .github/workflows/devsecops.yml

Pipeline Steps:

Checkout code from GitHub
Setup Node.js environment
Install dependencies (npm ci)
Run npm audit for vulnerabilities
Lint code with ESLint
Run unit tests (npm test) including Input Whitelisting validation
Optional: Build frontend for deployment
Benefits:
Ensures dependencies are safe
Validates input whitelisting logic
Automates security checks and testing before deployment
🧪 Unit Testing (Input Whitelisting)
Purpose: To ensure that user inputs are properly validated and sanitized.
Example Test (Jest):

import { usernameRegex } from "../utils/validation";

test("Reject invalid username with special characters", () => {
  const invalid = "admin$123";
  expect(usernameRegex.test(invalid)).toBe(false);
});
Run tests:
cd backend
npm test