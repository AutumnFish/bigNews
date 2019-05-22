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

// 暴露
module.exports = router