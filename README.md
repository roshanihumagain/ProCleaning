# ProCleaning - Backend API

Node.js/Express backend API for the ProCleaning service booking application with payment integration.

## Project Structure

```
server/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── tests/           # Test files
└── index.js         # Entry point
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/roshanihumagain/ProCleaning.git
cd ProCleaning
```

### 2. Server Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory based on `.env.example`:
```bash
cp .env.example .env
```

Then edit `.env` with your actual credentials:
- Database credentials
- JWT secret
- Khalti payment gateway credentials

### 3. Database Setup
Create a PostgreSQL database named `procleaning` and run any necessary migrations.

## Running the Server

```bash
cd server
npm start
```

The API server will be running at: http://localhost:5000

## API Features

- User authentication (login/registration) with JWT
- Service booking management
- Payment integration with Khalti payment gateway
- Admin endpoints for dashboard
- Contact form submissions
- Session management

## Technologies Used

- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Khalti API** - Payment gateway integration
- **bcrypt** - Password hashing

## Environment Variables

See `server/.env.example` for required environment variables.


