module.exports = (router, controller, validate) => {
  router
    .route('/')
    .post(validate(controller.refreshAccessTokenRequest()), controller.refreshAccessToken);

  return router;
};
