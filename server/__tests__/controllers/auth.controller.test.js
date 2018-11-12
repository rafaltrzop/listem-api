const request = require('supertest');
const app = require('../../app');

describe('/api/auth', () => {
  test('POST', () => {
    return request(app)
      .post('/api/auth')
      .send({
        email: 'email@gmail.com',
        password: '123456',
      })
      // .set('Content-Type', 'application/json')
      .expect(401);
  });
});
