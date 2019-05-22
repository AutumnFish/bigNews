const path = require('path')
// 导入提示
const message = require(path.join(__dirname, '../utils/message'))
// 导入配置
const config = require(path.join(__dirname, '../utils/config'))
module.exports = {
  // 用户登录
  login(req, res) {
    // 数据获取
    const user_name = req.body.user_name || ''
    const password = req.body.password || ''
    // 类型判断
    if (user_name === 'admin' && password === '123456') {
      res.send({
        msg: '登录成功',
        code: 200,
      })
    } else {
      res.send({
        msg: '用户名或密码错误',
        code: 400
      })
    }
  },
  // 用户登出
  logout(req,res){
    res.send({
      msg:"登出成功",
      code:200
    })
  }
}
