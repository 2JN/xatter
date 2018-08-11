var Sequelize = require('sequelize')

module.exports = new Sequelize('test', undefined, undefined, {
  dialect: 'mysql',
  port:    3306
})
