const passport = require('passport');

module.exports = (router, controller) => {
  router
    .route('/')
    .post(
      controller.createUserRequest(),
      passport.authenticate('signup', { session: false }),
      controller.createUser,
    );

  // TODO
  router
    .route('/:id')
    .get(controller.show)
    .put(controller.update) // or patch?
    .delete(controller.destroy);

  return router;
};
