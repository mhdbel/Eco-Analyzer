const request = require('supertest');
const app = require('../app');
const { User } = require('../models');

describe('Auth API', () => {
  beforeAll(async () => {
    await User.destroy({ where: {} });
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        email: 'test@example.com',
        password: 'password'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('User created');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'test@example.com',
        password: 'password'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});