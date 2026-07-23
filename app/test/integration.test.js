const request = require('supertest');
const assert = require('assert');

const BASE_URL = process.env.APP_URL || 'http://localhost:3001';

describe('Search app integration', () => {
  it('GET / returns the search form', async () => {
    const res = await request(BASE_URL).get('/');
    assert.strictEqual(res.status, 200);
    assert.match(res.text, /Enter search term/);
  });

  it('POST /search with a valid term returns 200 and echoes the term', async () => {
    const res = await request(BASE_URL).post('/search').type('form').send({ term: 'hello world' });
    assert.strictEqual(res.status, 200);
    assert.match(res.text, /hello world/);
  });

  it('POST /search with an attack payload is rejected', async () => {
    const res = await request(BASE_URL).post('/search').type('form').send({ term: "' OR 1=1 --" });
    assert.strictEqual(res.status, 400);
  });

  it('POST /search with too-short input is rejected', async () => {
    const res = await request(BASE_URL).post('/search').type('form').send({ term: 'a' });
    assert.strictEqual(res.status, 400);
  });
});
