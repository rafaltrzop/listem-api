const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../../../app');
const { Token, User } = require('../../../src/models');

describe('POST /api/auth', () => {
  describe('with correct credentials', () => {
    test('should respond with access token and refresh token', async () => {
      const email = 'test@gmail.com';
      const password = 'Passw0rd!';

      const { id: userId } = await User.create({
        email,
        passwordHash: password,
      });

      return request(app)
        .post('/api/auth')
        .send({
          email,
          password,
        })
        .expect(200)
        .then(async (res) => {
          const { accessToken } = res.body.data;

          const jwtRegExp = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?$/;
          expect(accessToken).toMatch(jwtRegExp);

          expect(() => {
            const secret = process.env.ACCESS_TOKEN_SECRET;
            jwt.verify(accessToken, secret);
          }).not.toThrow();

          const uuidV4RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
          expect(res.body.data.refreshToken).toMatch(uuidV4RegExp);

          expect(await Token.count({ where: { userId } })).toBe(1);
        });
    });
  });

  describe('with wrong credentials', () => {
    test('should respond with incorrect username or password (wrong password)', async () => {
      const email = 'test@gmail.com';
      const password = 'Passw0rd!';

      await User.create({
        email,
        passwordHash: password,
      });

      return request(app)
        .post('/api/auth')
        .send({ email, password: 'wrongPassw0rd!' })
        .expect(401)
        .then((res) => {
          expect(res.body.errors).toHaveLength(1);
          expect(res.body.errors[0]).toEqual({
            code: 'WRONG_CREDENTIALS',
            title: 'Incorrect username or password',
          });
        });
    });

    test('should respond with incorrect username or password (user not found)', () => {
      const user = {
        email: 'test@gmail.com',
        password: 'Passw0rd!',
      };

      return request(app)
        .post('/api/auth')
        .send(user)
        .expect(401)
        .then((res) => {
          expect(res.body.errors).toHaveLength(1);
          expect(res.body.errors[0]).toEqual({
            code: 'WRONG_CREDENTIALS',
            title: 'Incorrect username or password',
          });
        });
    });
  });
});
