module.exports = (router, controller) => {
  router.route('/')
    .get(controller.index);

  return router;
};
