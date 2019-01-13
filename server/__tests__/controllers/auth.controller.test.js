const request = require('supertest');
const faker = require('faker');

const app = require('../../app');
const models = require('../../models');

const { sequelize, User } = models;
const {
  internet: { email, password },
} = faker;

describe('POST /api/auth', () => {
  describe('with correct credentials', () => {
    test('should respond with access token', async (done) => {
      const user = {
        email: email(),
        password: password(),
      };
      await User.create(user);

      request(app)
        .post('/api/auth')
        .send(user)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body.data.token).toMatch(
            /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?$/,
          );
          done();
        });
    });
  });

  // TODO
  // describe('with wrong credentials', () => {
  //   test('should respond with error', () => request(app)
  //     .post('/api/auth')
  //     .send({
  //       email: 'test99@gmail.com',
  //       password: '123456',
  //     })
  //     .expect(401));
  // });

  // TODO: global afterEach clean database?
  afterEach(async () => {
    // drop and recreate given table
    // User.sync({ force: true });

    // truncate given table
    // User.truncate();

    // run .sync() only if database name ends with '_test'
    // await sequelize.sync({ force: true, match: /_test$/ });

    await sequelize.truncate();
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
