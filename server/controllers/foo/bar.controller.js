module.exports = (models) => ({
  index(req, res) {
    res.json({
      data: 'index foobar'
    });
  }
});
