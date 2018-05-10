module.exports = (router, controller, models) => {
  router.route('/')
    .get(controller.index);

  return router;
};
