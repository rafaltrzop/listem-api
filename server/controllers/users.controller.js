module.exports = (models) => ({
  index(req, res) {
    // TODO
    // const User = models.User;
    //
    // User.findAll().then(users => {
    //   console.log(users);
    // });

    res.json({
      data: 'index user'
    });
  },

  create(req, res) {
    // TODO: use valid JSON API response, send back only some fields?
    res.json({
      data: {
        user: req.user
      }
    });
  },

  show(req, res) {
    res.json({
      data: 'show user'
    });
  },

  update(req, res) {
    res.json({
      data: 'update user'
    });
  },

  destroy(req, res) {
    res.json({
      data: 'destroy user'
    });
  }
});
