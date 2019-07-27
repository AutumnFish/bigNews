const express = require('express')
const router = express.Router()
const categoryRouter = require('./category/categoryRouter')

// 中间件 - 分类路由
router.use('/category',categoryRouter)


module.exports = router
