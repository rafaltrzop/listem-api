const request = require('supertest');
const faker = require('faker');

const app = require('../../app');
const models = require('../../models');

const { User } = models;
const {
  internet: { email, password },
} = faker;

describe('POST /api/users', () => {
  test('should create a new user and return its id', async (done) => {
    const user = {
      email: email(),
      password: password(),
    };

    request(app)
      .post('/api/users')
      .send(user)
      .expect(201)
      .end(async (err, res) => {
        if (err) return done(err);

        expect(await User.count({ where: { email: user.email } })).toBe(1);
        expect(Number.isInteger(res.body.data.user.id)).toBe(true);
        expect(res.body.data.user.email).toBe(user.email);

        done();
      });
  });
});
