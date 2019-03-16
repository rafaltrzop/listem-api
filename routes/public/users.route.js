const passport = require('passport');

module.exports = (router, controller) => {
  router.route('/')
    .post(passport.authenticate('signup', { session: false }), controller.create);

  // TODO
  router.route('/:id')
    .get(controller.show)
    .put(controller.update) // or patch?
    .delete(controller.destroy);

  return router;
};
