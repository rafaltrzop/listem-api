const request = require('supertest');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = require('../../../app');
const { Token, User } = require('../../../src/models');
const { generateAccessToken } = require('../../../src/utils/auth');

describe('POST /api/auth/token', () => {
  describe('with valid tokens', () => {
    test('should respond with access token and refresh token', async () => {
      const email = 'test@gmail.com';
      const password = 'Passw0rd!';
      const { id: userId } = await User.create({
        email,
        passwordHash: password,
      });

      const refreshToken = uuidv4();

      const token = {
        userId,
        refreshToken,
      };
      await Token.create(token);

      const payload = {
        user: {
          id: userId,
        },
      };
      const tokens = {
        accessToken: generateAccessToken(payload),
        refreshToken,
      };

      return request(app)
        .post('/api/auth/token')
        .send(tokens)
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

  describe('with invalid tokens', () => {
    test('should respond with invalid signature of access token', () => {
      const tokens = {
        accessToken: 'invalid.access.token',
        refreshToken: uuidv4(),
      };

      return request(app)
        .post('/api/auth/token')
        .send(tokens)
        .expect(422)
        .then((res) => {
          expect(res.body.errors).toHaveLength(1);
          expect(res.body.errors[0]).toEqual({
            code: 'INVALID_ACCESS_TOKEN',
            title: 'Invalid signature of access token',
          });
        });
    });

    test('should respond with invalid refresh token', () => {
      const payload = {
        user: {
          id: 1,
        },
      };
      const tokens = {
        accessToken: generateAccessToken(payload),
        refreshToken: uuidv4(),
      };

      return request(app)
        .post('/api/auth/token')
        .send(tokens)
        .expect(401)
        .then((res) => {
          expect(res.body.errors).toHaveLength(1);
          expect(res.body.errors[0]).toEqual({
            code: 'INVALID_REFRESH_TOKEN',
            title: 'Invalid refresh token',
          });
        });
    });
  });
});
