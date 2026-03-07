const request = require('supertest');
const app = require('../src/app');
const { generateToken } = require('../src/utils/auth');

describe('Booking Endpoints', () => {
  let customerToken;
  let adminToken;
  let bookingId;

  beforeAll(() => {
    customerToken = generateToken(2, 'CUSTOMER');
    adminToken = generateToken(1, 'ADMIN');
  });

  it('should allow customer to create a booking', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        serviceId: 1,
        planType: 'HOURLY',
        bookingDate: '2026-02-01',
        bookingTime: '10:00:00',
        address: 'Test Address',
        phone: '1234567890'
      });
    
    expect(res.statusCode).toEqual(201);
    bookingId = res.body.id;
  });

  it('should allow customer to view their own bookings', async () => {
    const res = await request(app)
      .get('/api/bookings/my')
      .set('Authorization', `Bearer ${customerToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should allow admin to view all bookings', async () => {
    const res = await request(app)
      .get('/api/bookings')
      .set('Authorization', `Bearer ${adminToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
