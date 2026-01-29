const request = require('supertest');
const app = require('../src/app');
const { generateToken } = require('../src/utils/auth');

// Mock khaltiService to avoid real API calls during tests
jest.mock('../src/services/khalti.service', () => ({
  initiatePayment: jest.fn().mockResolvedValue({
    pidx: 'test_pidx_123',
    payment_url: 'https://test.khalti.com/pay'
  }),
  verifyPayment: jest.fn().mockResolvedValue({
    status: 'Completed',
    total_amount: 1000
  })
}));

describe('Payment Endpoints', () => {
  let customerToken;
  let adminToken;
  let bookingId;

  beforeAll(async () => {
    customerToken = generateToken(2, 'CUSTOMER');
    adminToken = generateToken(1, 'ADMIN');

    // Ensure a service exists
    const serviceRes = await request(app)
      .post('/api/services')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Test Service',
        description: 'Test',
        price_hourly: 500,
        price_daily: 2500
      });
    const serviceId = serviceRes.body.id;

    // Create a booking
    const bookingRes = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        serviceId: serviceId,
        planType: 'HOURLY',
        bookingDate: '2026-02-01',
        bookingTime: '10:00:00',
        address: 'Test',
        phone: '1234567890',
        duration: 2
      });
    bookingId = bookingRes.body.id;
  });

  it('should initiate a payment for a booking', async () => {
    const res = await request(app)
      .post('/api/payments/initiate')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ bookingId });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('pidx');
  });

  it('should verify a payment', async () => {
    const res = await request(app)
      .post('/api/payments/verify')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ pidx: 'test_pidx_123' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toContain('successfully');
  });
});
