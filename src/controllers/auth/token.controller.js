module.exports = (models) => ({
  // TODO: rename?
  index(req, res) {
    console.log('#####################');
    console.log(req.body);
    console.log('#####################');

    res.json({
      data: 'index token refresh',
    });
  },
});
