import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';

const agent = supertest(app);

describe('GET /health', () => {
  it('should answer with status 200', async () => {
    const response = await agent.get('/health');
    expect(response.status).toEqual(200);
  });
});
