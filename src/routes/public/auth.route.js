module.exports = (router, controller, validate) => {
  router.route('/').post(validate(controller.loginRequest()), controller.login);

  return router;
};
