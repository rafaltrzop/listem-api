const express = require('express');
const app = express();
const router = express.Router();
const models = require('../models');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const routeName = path.basename(file, '.route.js');
    const controller = require(`../controllers/${routeName}.controller`);
    const route = require(`./${routeName}.route`)(router, controller, models);

    app.use(`/${routeName}`, route);
  });

module.exports = app;
