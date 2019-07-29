const express = require('express')
const router = express.Router()
// 验证插件
const { check } = require("express-validator")
// 控制器
const indexController = reqlib('/controllers/indexController.js')

// 错误信息提示中间件
const {errorMsg} = reqlib('/utils/message')

  

// 路由 - 评论新增
router.post('/post_comment',[
    check('author').not().isEmpty().isLength({max:6}),
    check('content').not().isEmpty(),
    check('articleId').not().isEmpty()
],errorMsg,indexController.post_comment)

// 路由 - 评论列表
router.get('/get_comment',[
    check('articleId').not().isEmpty()
],errorMsg,indexController.get_comment)

// 路由 - 文章搜索
router.get('/search',indexController.search)
// 路由 - 文章类型
router.get('/category',indexController.category)


module.exports = router
