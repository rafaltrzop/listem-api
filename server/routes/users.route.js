module.exports = (router, controller, models) => {
  const User = models.User;

  User.findAll().then(users => {
    console.log(users);
  });

  router.route('/')
    .get(controller.index);

  return router;
};
