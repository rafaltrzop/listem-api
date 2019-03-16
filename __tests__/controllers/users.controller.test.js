const request = require('supertest');
const faker = require('faker');

const app = require('../../app');
const models = require('../../models');

const { User } = models;
const {
  internet: { email, password },
} = faker;

describe('POST /api/users', () => {
  test('should create a new user and return its id', async () => {
    const user = {
      email: email(),
      password: password(),
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
