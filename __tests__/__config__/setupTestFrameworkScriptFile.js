// const app = require('../../app');
const models = require('../../src/models');

const { sequelize } = models;

// TODO: consider using globals instead of imports in every test file
// global.app = app;
// global.models = models;

afterEach(async () => {
  await sequelize.truncate({ cascade: true });
});

afterAll(async () => {
  await sequelize.close();
});
