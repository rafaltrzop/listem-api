module.exports = (router, controller) => {
  router.route('/')
    .get(controller.index)
    .post(controller.create);

  router.route('/:id')
    .get(controller.show)
    .put(controller.update) // or patch?
    .delete(controller.destroy);

  return router;
};
