import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import app from '../index';

const prisma = new PrismaClient();

describe('User API', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
     // Clear the test database
  });
 
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', password: "54871900aA", name: 'Test User' });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe('test@example.com');
  });
});
