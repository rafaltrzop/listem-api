module.exports = (models) => ({
  // TODO
  index(req, res, next) {
    res.json({
      message: 'You made it to the secure route',
      accessToken: req.query.accessToken,
    });
  },
});
