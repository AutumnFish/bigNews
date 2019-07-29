// 数据库
const db = require("../db")
const articleData = require("./resetData/article.json")
const categoryData = require("./resetData/category.json")
db.sequelize.sync({ force: true }).then(async () => {
  try {
    await db.Category.bulkCreate(categoryData)
    await db.Article.bulkCreate(articleData)
  } catch (error) {
    console.log(error)
  }
  // console.log(res);
})
