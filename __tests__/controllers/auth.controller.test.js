const request = require('supertest');
const faker = require('faker');

const app = require('../../app');
const models = require('../../models');

const { User } = models;
const {
  internet: { email, password },
} = faker;

describe('POST /api/auth', () => {
  describe('with correct credentials', () => {
    test('should respond with access token', async () => {
      const user = {
        email: email(),
        password: password(),
      };
      await User.create(user);

      return request(app)
        .post('/api/auth')
        .send(user)
        .expect(200)
        .then((res) => {
          expect(res.body.data.token).toMatch(
            /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?$/,
          );
        });
    });
  });

  describe('with wrong credentials', () => {
    test('should respond with wrong password error', async () => {
      const user = {
        email: email(),
        password: password(),
      };
      await User.create(user);

      return request(app)
        .post('/api/auth')
        .send({ ...user, password: password() })
        .expect(401)
        .then((res) => {
          expect(res.body.errors.length).toBe(1);
          expect(res.body.errors[0]).toEqual({ title: 'Wrong password' });
        });
    });

    test('should respond with user not found error', () => {
      const user = {
        email: email(),
        password: password(),
      };

      return request(app)
        .post('/api/auth')
        .send(user)
        .expect(401)
        .then((res) => {
          expect(res.body.errors.length).toBe(1);
          expect(res.body.errors[0]).toEqual({ title: 'User not found' });
        });
    });

    test('should respond with missing credentials error', () => {
      const user = {};

      return request(app)
        .post('/api/auth')
        .send(user)
        .expect(401)
        .then((res) => {
          expect(res.body.errors.length).toBe(1);
          expect(res.body.errors[0]).toEqual({ title: 'Missing credentials' });
        });
    });
  });
});
