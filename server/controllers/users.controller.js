module.exports = models => ({
  // TODO
  index(req, res) {
    // const User = models.User;
    //
    // User.findAll().then(users => {
    //   console.log(users);
    // });

    res.json({
      data: 'index user',
    });
  },

  create(req, res) {
    // TODO: use valid JSON API response, send back only some fields? no password (hash)?
    // TODO: add location header
    // https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.30
    // https://docs.microsoft.com/pl-pl/azure/architecture/best-practices/api-design#post-methods
    res.status(201).json({
      data: {
        user: req.user,
      },
    });
  },

  // TODO
  show(req, res) {
    res.json({
      data: 'show user',
    });
  },

  // TODO
  update(req, res) {
    res.json({
      data: 'update user',
    });
  },

  // TODO
  destroy(req, res) {
    res.json({
      data: 'destroy user',
    });
  },
});
