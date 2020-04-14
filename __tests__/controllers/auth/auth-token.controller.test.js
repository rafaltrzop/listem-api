const request = require('supertest');
const { v4: uuidv4 } = require('uuid');

const app = require('../../../app');
const { generateAccessToken } = require('../../../src/utils/auth');

describe('POST /api/auth/token', () => {
  describe.skip('with valid tokens', () => {
    test('should respond with access token and refresh token', () => {
      // TODO
    });
  });

  // TODO: fix flaky test
  //  SequelizeDatabaseError: relation "Tokens" does not exist
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
