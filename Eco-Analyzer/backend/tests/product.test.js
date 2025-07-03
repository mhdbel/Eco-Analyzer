const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

describe('Product API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('should analyze a product', async () => {
    const res = await request(app)
      .post('/api/analyze')
      .send({
        name: 'Test Product',
        description: 'Eco-friendly product',
        manufacturingDetails: 'Low energy process',
        supplyChainInfo: 'Local suppliers'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.product.impactScore).toBeGreaterThan(0);
    expect(res.body.recommendations).toBeInstanceOf(Array);
  });

  it('should get product history', async () => {
    const loginRes = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'password' });
    
    const token = loginRes.body.token;
    
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});