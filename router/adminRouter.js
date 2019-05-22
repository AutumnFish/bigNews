// 导入express
const express = require('express')
// 导入路由
const router = express.Router()
// 导入控制器
const adminController = require('../controllers/adminController')
// 导入bodyParser中间件
const bodyParser = require('body-parser')

// 注册body-parser中间件
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// 登录
router.post('/login',adminController.login)
// 登出
router.post('/logout',adminController.logout)
// 获取用户信息
router.get('/getuser',adminController.getuser)
// 获取用户信息
router.get('/article_count',adminController.article_count)
// 获取评论数量统计
router.get('/comment_count',adminController.comment_count)
// 月新增文章数
router.get('/month_article_count',adminController.month_article_count)
// 文章类型数量统计
router.get('/article_category_count',adminController.article_category_count)
// 月文章访问量
router.get('/article_category_visit',adminController.article_category_visit)
// 文章搜索
router.get('/search',adminController.search)

// 暴露
module.exports = router