module.exports = (models) => ({
  // TODO
  index(req, res, next) {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      accessToken: req.query.accessToken,
    });
  },
});
