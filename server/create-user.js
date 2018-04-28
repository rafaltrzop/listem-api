const User = require('./models/user.model');

User.sync({force: true}).then(() => {
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});