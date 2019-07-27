const express = require('express')
const cors= require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const adminRouter= require('./router/adminRouter')

const app = express()

// 中间件 - 跨域
app.use(cors())

// 中间件 - post数据解析
app.use(bodyParser.urlencoded({ extended: false }))

// 中间件 - 日志 最小模式输出
app.use(morgan('tiny'))

// 中间件 - 路由 - admin
app.use('/admin',adminRouter)



app.listen(8080,()=>{
    console.log('开启成功: http://localhost:8080');
})