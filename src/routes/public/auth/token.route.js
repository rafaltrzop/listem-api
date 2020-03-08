module.exports = (router, controller) => {
  router.route('/').post(controller.index);

  return router;
};
