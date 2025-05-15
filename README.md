# Medicine-Sphere Backend — RESTful API for Medicine Management

This is the backend API for Medicine-Sphere, a full-stack healthcare and medicine management platform. It handles user authentication, medicine data, prescriptions, orders, and admin operations with a secure and scalable Node.js + TypeScript architecture.

Live Frontend: https://medi-sphere-five.vercel.app/
Frontend Repo: https://github.com/Faey2023/medi-sphere

---

## Tech Stack

- Language: TypeScript
- Runtime: Node.js with Express.js
- Database: MongoDB using Mongoose ODM
- Authentication: JWT (JSON Web Token)
- Security: Helmet, CORS, Rate Limiting, Input Sanitization
- Cloudinary: For image and prescription uploads
- Payment: SSLCommerz Integration
- File Structure: MVC (Model-View-Controller) pattern

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://medi-shpere.vercel.app/
cd medicine-sphere-backend
2. Install dependencies
bash
Copy
Edit
npm install
3. Set up environment variables
Create a .env file based on .env.example:

bash
Copy
Edit
cp .env.example .env
Fill in your MongoDB URI, JWT secrets, Cloudinary credentials, and SSLCommerz keys.

4. Run the development server
bash
Copy
Edit
npm run dev
Server runs at http://localhost:5000 by default.
```

Core Features
User registration, login, and role-based access control

Secure JWT authentication middleware

Full CRUD for medicines with advanced filters

Order creation, history tracking, and payment status

Prescription uploads and verification system (via Cloudinary)

Admin tools for managing medicines, users, and orders

SSLCommerz integration for payment processing

Error handling and validation with express-validator or Zod
