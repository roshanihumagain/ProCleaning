const request = require('supertest');
const app = require('../src/app');
const { generateToken } = require('../src/utils/auth');

describe('Interaction Endpoints', () => {
  let customerToken;
  let adminToken;

  beforeAll(() => {
    customerToken = generateToken(2, 'CUSTOMER');
    adminToken = generateToken(1, 'ADMIN');
  });

  it('should allow public inquiry submission', async () => {
    const res = await request(app)
      .post('/api/interactions/inquiries')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Looking for group'
      });
    
    expect(res.statusCode).toEqual(201);
  });

  it('should allow customer to submit testimonial', async () => {
    const res = await request(app)
      .post('/api/interactions/testimonials')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ text: 'Great service!' });
    
    expect(res.statusCode).toEqual(201);
  });

  it('should allow admin to view all inquiries', async () => {
    const res = await request(app)
      .get('/api/interactions/inquiries')
      .set('Authorization', `Bearer ${adminToken}`);
    
    expect(res.statusCode).toEqual(200);
  });
});
