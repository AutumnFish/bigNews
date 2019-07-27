
const Sequelize = require('sequelize');
const CategoryModel = require('./models/category.js');
const {database,username,password,host}= require('../config')

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  define: {
    // `timestamps` 字段指定是否将创建 `createdAt` 和 `updatedAt` 字段.
    // 该值默认为 true, 但是当前设定为 false
    timestamps: false
  }
});

const Category = CategoryModel(sequelize, Sequelize);


module.exports = {
  sequelize,
  Sequelize,
  Category
}