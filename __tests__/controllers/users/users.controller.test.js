const request = require('supertest');

const app = require('../../../app');
const { User } = require('../../../src/models');

describe('POST /api/users', () => {
  test('should create a new user and return its id and email', async () => {
    const user = {
      email: 'test@gmail.com',
      password: 'Passw0rd!',
    };

    return request(app)
      .post('/api/users')
      .send(user)
      .expect(201)
      .then(async (res) => {
        expect(await User.count({ where: { email: user.email } })).toBe(1);
        expect(Number.isInteger(res.body.data.user.id)).toBe(true);
        expect(res.body.data.user.email).toBe(user.email);
      });
  });
});
