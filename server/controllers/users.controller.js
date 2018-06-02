module.exports = (models) => ({
  index(req, res) {
    // TODO
    // const User = models.User;
    //
    // User.findAll().then(users => {
    //   console.log(users);
    // });

    // TODO
    const User = models.User;
    User.create({
      email: 'test@gmail.com',
      password: '123456'
    });

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
