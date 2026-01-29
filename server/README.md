# ProCleaning Backend

This is the backend for the ProCleaning platform, built with Node.js, Express, and PostgreSQL. It features JWT authentication and Khalti payment integration.

## Setup Instructions

1.  **Extract the backend**:
    Make sure you have the `backend` folder in your project directory.

2.  **Install Dependencies**:
    ```bash
    cd backend
    npm install
    ```

3.  **Database Setup**:
    - Ensure PostgreSQL is running locally.
    - Create a database named `procleaning`.
    - Run the SQL commands found in `schema.sql` to create the tables and insert initial service data.

4.  **Configuration**:
    - Open the `.env` file in the `backend` directory.
    - Update `DB_USER`, `DB_PASSWORD`, and other database credentials.
    - Add your **Khalti Secret Key** to `KHALTI_SECRET_KEY`.

5.  **Run the Server**:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:5000`.

6.  **Run Automated Tests**:
    - Ensure your database is connected and `schema.sql` has been run.
    - Run the following command:
    ```bash
    npm test
    ```
    This will execute integration tests for all modules (Auth, Services, Bookings, Payments, etc).

## API Documentation

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and get a JWT.
- `GET /api/auth/me`: Get current user profile (Requires Token).

### Services
- `GET /api/services`: List all cleaning services.
- `POST /api/services`: Create a service (Admin Only).
- `PUT /api/services/:id`: Update a service (Admin Only).
- `DELETE /api/services/:id`: Delete a service (Admin Only).

### Bookings
- `POST /api/bookings`: Create a new booking (Requires Token).
- `GET /api/bookings/my`: List current user's bookings (Requires Token).
- `GET /api/bookings`: List all bookings (Admin Only).
- `PATCH /api/bookings/:id/status`: Update booking status (Admin Only).

### Payments
- `POST /api/payments/initiate`: Initiate a Khalti payment for a booking.
- `POST /api/payments/verify`: Verify a payment using the `pidx`.

### Interactions
- `POST /api/interactions/inquiries`: Submit a contact form inquiry.
- `GET /api/interactions/inquiries`: View all inquiries (Admin Only).
- `POST /api/interactions/testimonials`: Submit a testimonial (Requires Token).
- `GET /api/interactions/testimonials`: View approved testimonials.
- `POST /api/interactions/testimonials/approve/:id`: Approve a testimonial (Admin Only).

## Sample API Requests (JSON)

### Register User
`POST /api/auth/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Initiate Payment
`POST /api/payments/initiate`
```json
{
  "bookingId": 1
}
```

## Khalti Sandbox Testing
To test payments in the sandbox:
1. Use the test credentials provided by Khalti:
   - **Mobile**: 9800000000, 9800000001 ... 9800000005
   - **PIN**: 1111
   - **OTP**: 987654
2. Ensure you use the `KHALTI_SECRET_KEY` from your merchant dashboard.

## Integration & Synchronization

- **Dynamic Services**: Services are now managed on the backend and fetched dynamically by the frontend.
- **Auto-Price Calculation**: The booking `total_amount` is calculated on the backend based on DB prices to prevent tampering.
- **Full User Flow**: Registration -> Login -> Service Selection -> Booking -> Khalti Payment -> Profile (Booking History & Reviews).
- **Security**: JWT authentication is enforced for all protected flows. Admin roles are verified for sensitive operations.
