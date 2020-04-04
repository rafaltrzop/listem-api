const request = require('supertest');

const app = require('../../app');
const models = require('../../src/models');

const { Token, User } = models;

describe('POST /api/auth', () => {
  describe('with correct credentials', () => {
    test('should respond with access token and refresh token', async () => {
      const user = {
        email: 'test@gmail.com',
        password: 'Passw0rd!',
      };
      const { id: userId } = await User.create(user);

      return request(app)
        .post('/api/auth')
        .send(user)
        .expect(200)
        .then(async (res) => {
          expect(await Token.count({ where: { userId } })).toBe(1);

          const jwtRegExp = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?$/;
          expect(res.body.data.accessToken).toMatch(jwtRegExp);

          const uuidV4RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
          expect(res.body.data.refreshToken).toMatch(uuidV4RegExp);
        });
    });
  });

  describe('with wrong credentials', () => {
    test('should respond with incorrect username or password (wrong password)', async () => {
      const user = {
        email: 'test@gmail.com',
        password: 'Passw0rd!',
      };
      await User.create(user);

      return request(app)
        .post('/api/auth')
        .send({ ...user, password: 'wrongPassw0rd!' })
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
