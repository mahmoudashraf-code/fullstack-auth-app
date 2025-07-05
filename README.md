# Fullstack Authentication App

A complete authentication application with user sign up, sign in, and a protected dashboard.

## Features

- User registration with validation
- User login with JWT authentication
- Protected routes
- Modern React with TypeScript
- NestJS backend with MongoDB
- Docker containerization

## Tech Stack

**Frontend:**
- React with TypeScript
- React Router for navigation
- React Hook Form with Zod for validation
- Tailwind CSS for styling
- Axios for API requests

**Backend:**
- NestJS with TypeScript
- MongoDB with TypeORM
- JWT for authentication
- Class Validator for input validation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (or use Docker Compose)
- Docker and Docker Compose (optional)

### Running with Docker (Recommended)

1. Clone the repository
2. Run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- MongoDB: localhost:27017

### Running locally

1. Clone the repository
2. Start MongoDB locally
3. Start the backend server:
   ```bash
   cd server
   npm install
   cp .env.example .env  # Update with your settings
   npm run start:dev
   ```
4. Start the frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs

# Rebuild specific service
docker-compose build backend
docker-compose build frontend
```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile (protected)
