Customer Portal Project – INSY7314 POE
Table of Contents
Project Overview
Features
Tech Stack
Setup Instructions
Running the Application
Security & Rubric Implementation
DevSecOps Pipeline
Unit Testing (Input Whitelisting)
Screenshots
Authors
Project Overview
This Customer Portal is a secure web application that allows users to register, log in, and perform payments to different recipients.
The project focuses on security best practices while providing a smooth user interface that adheres to a modern theme (gradient backgrounds, clean forms, and dashboard).
Features
User Registration & Login
Passwords hashed and salted with bcrypt.
JWT-based authentication.
Payments Portal
Create payments with input validation.
View all your payments.
Security Features
HTTPS server for secure communication.
Rate limiting using express-rate-limit.
HTTP headers security using helmet.
Input whitelisting for forms to prevent injections.
Frontend Theme
Gradient backgrounds with smooth animations.
Modern and consistent form and dashboard styling.
DevSecOps Integration
Automated security checks, linting, and unit tests via GitHub Actions.
Tech Stack
Backend: Node.js, Express, MongoDB, Mongoose
Frontend: React, React Router, Axios
Authentication: JWT, bcrypt
Security Middleware: Helmet, express-rate-limit, CORS
DevSecOps & Testing: Jest, GitHub Actions
Setup Instructions
Prerequisites
Node.js >= 22
npm >= 9
MongoDB installed locally or Atlas account
Chrome (recommended)
Backend Setup
cd backend
npm install
Frontend Setup
cd frontend
npm install
SSL Certificates
The app uses HTTPS locally. Generate certificates with mkcert:
mkcert -install
mkcert localhost
Place the .pem and .key files in backend/cert/.
Running the Application
Backend
cd backend
npm run dev
Frontend
cd frontend
npm start
Visit: https://localhost:3000
You may need to accept the self-signed certificate once in Chrome.
Security & Rubric Implementation
Criteria	Implementation
Password Security	Passwords are hashed with bcrypt and salted before storage. JWT used for authentication.
Input Whitelisting	Backend validates all form fields using regex patterns. Frontend also sanitizes input.
Securing Data (SSL)	HTTPS implemented with locally generated certificates.
Protecting Routes	Rate limiting with express-rate-limit. Helmet headers applied. Private routes protected via JWT middleware.
DevSecOps	GitHub Actions workflow runs automated tests, linting, and security audits on every push.
DevSecOps Pipeline
The project includes a GitHub Actions pipeline to automate security and testing:
File: .github/workflows/devsecops.yml
Steps:
Checkout code from GitHub.
Setup Node.js environment.
Install dependencies (npm ci).
Run npm audit for vulnerabilities.
Lint code with ESLint.
Run unit tests (npm test) including Input Whitelisting validation.
Optional: Build frontend for deployment.
Benefits:
Ensures dependencies are safe.
Validates that new code doesn’t break input validation.
Automates security and build checks before deployment.
Unit Testing (Input Whitelisting)
Purpose: To verify that form inputs reject malicious or invalid data.
Example Test (Jest):
test("Rejects invalid username with special chars", () => {
  const invalid = "admin$123";
  expect(usernameRegex.test(invalid)).toBe(false);
});
Run tests:
cd backend
npm test
Screenshots
Login Page: Modern gradient design with username/password fields.
Dashboard: Displays user info and JWT token.
Payments Portal: Form with input validation and payment history display.
Authors
Shalin Reddy – Project Author, Backend & Frontend Developer
✅ Conclusion:
This project demonstrates a secure, fully functional customer portal that adheres to the rubric requirements for Password Security, Input Validation, Securing Data, Protecting Routes, Unit Testing, and DevSecOps Pipeline.