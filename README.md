# Fullstack Authentication App

A complete authentication application with user sign up, sign in, and a protected dashboard.

## Features

- User registration with validation
- User login with JWT authentication
- Protected routes
- Modern React with TypeScript
- Express backend with MongoDB
- Docker containerization

## Tech Stack

**Frontend:**
- React with TypeScript
- React Router for navigation
- React Hook Form with Zod for validation
- Tailwind CSS for styling
- Axios for API requests

**Backend:**
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Express Validator for input validation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (or use Docker Compose)
- Docker and Docker Compose (optional)

### Running locally

1. Clone the repository
2. Start the backend server:
   ```bash
   cd server
   npm install
   cp .env.example .env  # Update with your settings
   npm run dev
   ```
3. Start the frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```

### Running with Docker

```bash
docker-compose up
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile (protected)
