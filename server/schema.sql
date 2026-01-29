-- Database Schema for ProCleaning

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'CUSTOMER', -- CUSTOMER, ADMIN
    avatar_url TEXT,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price_hourly DECIMAL(10, 2),
    price_daily DECIMAL(10, 2),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    service_id INTEGER REFERENCES services(id) ON DELETE SET NULL,
    plan_type VARCHAR(20) NOT NULL, -- HOURLY, DAILY
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'CREATED', -- CREATED, PAYMENT_PENDING, PAID, COMPLETED, CANCELLED
    booking_date DATE,
    booking_time TIME,
    address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    provider VARCHAR(50) DEFAULT 'khalti',
    pidx VARCHAR(255) UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'INITIATED', -- INITIATED, VERIFIED, FAILED
    raw_response JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Service Data
INSERT INTO services (title, description, price_hourly, price_daily) VALUES 
('Basic Package', 'Dusting, sweeping, mopping, kitchen cleaning, bathroom cleaning, emptying trash bins', 500, 2500),
('Enterprise Package', 'All services in Basic Plan, detailed dusting, wiping down appliances, changing linens', 400, 2200),
('Premium Package', 'Deep cleaning, baseboards, organization, carpet spot cleaning', 600, 2800),
('Specialized Package', 'Deep cleaning of kitchen, vents, detailed bathroom cleaning', 800, 3200)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title, 
    description = EXCLUDED.description, 
    price_hourly = EXCLUDED.price_hourly, 
    price_daily = EXCLUDED.price_daily;
