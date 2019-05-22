// 导入express
const express = require('express')
// 日志中间件
const morgan = require('morgan')
// 导入路由
const frontRouter = require('./router/frountRouter')
const adminRouter = require('./router/adminRouter')
// 实例化服务器对象
const app = express()
// 日志中间件
app.use(morgan('tiny'))
// cors
app.use(cors())

// 注册前台路由
app.use('/', frontRouter)
// 注册后台路由
app.use('/admin', adminRouter)

// 开启监听
app.listen(8000, () => {
  console.log('app已启动,端口为8000')
})
