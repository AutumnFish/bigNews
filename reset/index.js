// 数据库
const db = require("../db")
// 导入mock
const articleData = require("./resetData/article.json")
const categoryData = require("./resetData/category.json")
const userData = require("./resetData/user.json")
// 导入fs
const fs = require('fs')
// 导入path
const path = require('path')

// 生成随机数据
const Mock = require("mockjs")

// 随机数据的方法
function randomData(num) {
  return Mock.mock({
    [`Comment|${num}`]: [
      {
        "id|+1": 1,
        // 随机的作者名
        author: "@cname",
        // 内容
        content: "@csentence(8,32)",
        date: "@datetime",
        articleId:"@natural(1,220)",
        state:"待审核"
      }
    ]
  })
}

db.sequelize.sync({ force: true }).then(async () => {
  try {
    await db.Category.bulkCreate(categoryData)
    await db.Article.bulkCreate(articleData)
    await db.Comment.bulkCreate(randomData(1000).Comment)
    await db.User.create(userData)
    await fs.copyFileSync(path.join(__dirname,'./static/icon.jpg'),path.join(__dirname,'../uploads/icon.jpg'))
    // 移动图片
    await console.log('初始化完毕！！');
  } catch (error) {
    console.log(error)
  }
  // console.log(res);
})
