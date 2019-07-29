const express = require('express')
const router = express.Router()
// 验证插件
const { check } = require("express-validator")
// 控制器
const indexController = reqlib('/controllers/indexController.js')

// 错误信息提示中间件
const {errorMsg} = reqlib('/utils/message')

  

// 中间件 - 评论新增
router.post('/post_comment',[
    check('author').not().isEmpty().isLength({max:6}),
    check('content').not().isEmpty(),
    check('articleId').not().isEmpty()
],errorMsg,indexController.post_comment)


module.exports = router
