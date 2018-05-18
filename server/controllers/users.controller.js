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
    res.json({
      data: 'create user'
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
