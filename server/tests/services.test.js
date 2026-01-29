const request = require('supertest');
const app = require('../src/app');
const { generateToken } = require('../src/utils/auth');

describe('Service Endpoints', () => {
  let adminToken;
  let serviceId;

  beforeAll(() => {
    adminToken = generateToken(1, 'ADMIN');
  });

  it('should list all services (public)', async () => {
    const res = await request(app).get('/api/services');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should allow admin to create a service', async () => {
    const res = await request(app)
      .post('/api/services')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'New Package',
        description: 'Testing service creation',
        price_hourly: 600,
        price_daily: 3000
      });
    
    expect(res.statusCode).toEqual(201);
    serviceId = res.body.id;
  });

  it('should return 403 when a customer tries to create a service', async () => {
    const customerToken = generateToken(2, 'CUSTOMER');
    const res = await request(app)
      .post('/api/services')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ title: 'Unauthorized' });
    
    expect(res.statusCode).toEqual(403);
  });
});
