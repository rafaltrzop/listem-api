/* eslint-disable global-require, import/no-dynamic-require */

const express = require('express');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const models = require('../models');

const publicRoutes = express();
const privateRoutes = express();
const basename = path.basename(__filename);

function validate(validations) {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
}

function autoloadRoutes(routesDir, app, directory = '') {
  fs.readdirSync(routesDir)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename)
    .forEach((file) => {
      const filePath = `${routesDir}/${file}`;

      fs.stat(filePath, (err, stats) => {
        if (stats.isDirectory()) {
          const dir = `${directory}${file}/`;
          autoloadRoutes(filePath, app, dir);
        } else {
          const router = express.Router();
          const routeName = path.basename(file, '.route.js');
          const controller = require(`../controllers/${directory}${routeName}.controller`)(models);
          const route = require(filePath)(router, controller, validate);

          app.use(`/${directory}${routeName}`, route);
        }
      });
    });
}

autoloadRoutes(path.join(__dirname, 'public'), publicRoutes);
autoloadRoutes(path.join(__dirname, 'private'), privateRoutes);

module.exports = {
  publicRoutes,
  privateRoutes,
};
