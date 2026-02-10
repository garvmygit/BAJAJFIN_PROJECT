const request = require('supertest');
const app = require('../src/app');

describe('Health Check Endpoint', () => {
  test('GET /health should return status 200 with is_success true', async () => {
    const response = await request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('is_success', true);
    expect(response.body).toHaveProperty('message');
  });

  test('GET /bfhl (health check) should return status 200', async () => {
    const response = await request(app)
      .get('/bfhl')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('is_success', true);
    expect(response.body).toHaveProperty('message', 'BFHL API is working');
  });

  test('POST /bfhl with fibonacci should return valid response', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({ fibonacci: 7 })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('is_success', true);
    expect(response.body).toHaveProperty('official_email');
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('POST /bfhl with prime should return filtered primes', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({ prime: [2, 4, 7, 9, 11] })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('is_success', true);
    expect(response.body).toHaveProperty('official_email');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toEqual([2, 7, 11]);
  });

  test('Undefined route should return 404 error', async () => {
    const response = await request(app)
      .get('/undefined-route')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toHaveProperty('is_success', false);
    expect(response.body).toHaveProperty('error', 'Endpoint not found');
  });

  test('POST /bfhl with AI should handle missing OPENAI_API_KEY gracefully', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({ AI: 'What is the capital of France?' })
      .expect('Content-Type', /json/);

    // Either it successfully calls OpenAI or returns an error
    if (!process.env.OPENAI_API_KEY) {
      // Without API key, expect an error
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('is_success', false);
    }
    // With valid API key, would return status 200 with data
  });

  test('POST /bfhl with empty AI field should return error', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({ AI: '' })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('is_success', false);
    expect(response.body).toHaveProperty('error');
  });
});
