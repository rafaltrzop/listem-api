const express = require('express');
const swaggerUi = require('swagger-ui-express');
const $SyncRefParser = require('json-schema-ref-parser-sync');

const authRoutes = require('./auth');
const fooRoutes = require('./foo');
const usersRoutes = require('./users');

const router = express.Router();

router.use('/api', authRoutes);
router.use('/api', fooRoutes);
router.use('/api', usersRoutes);

if (process.env.NODE_ENV === 'development') {
  const swaggerDocument = $SyncRefParser.dereference('./docs/swagger.yml');
  router.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { customSiteTitle: 'Listem API' })
  );
}

module.exports = router;
