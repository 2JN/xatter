var Sequelize = require('sequelize');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(sequelize) {
  var User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING
    },

    password: {
      type: Sequelize.STRING,
      set(password) {
        this.setDataValue(
          'password',
          bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
        )
      }
    },

    role: {
      type: Sequelize.STRING
    }
  });

  User.prototype.validPassword = function(password) {
    console.log(this.password, password)
    return bcrypt.compareSync(password, this.password);
  }

  return User;
}
