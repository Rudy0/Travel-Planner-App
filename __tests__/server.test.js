const supertest = require('supertest');
const app = require('../src/server/server');
const request = supertest(app);

it('gets the test endpoint', async done => {
    const response = await request.get('/test')

    expect(response.body.message).toBe('OK')
    done()
  })