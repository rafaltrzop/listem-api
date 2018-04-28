const User = require('./models/user.model');

User.findAll().then(users => {
    console.log(users)
});