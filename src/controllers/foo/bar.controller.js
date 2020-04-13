// TODO: remove this test route

module.exports = {
  index(req, res) {
    res.json({
      message: 'You made it to the secure route',
      accessToken: req.query.accessToken,
    });
  },
};
