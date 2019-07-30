const { User } = require("../db")

const serverError = res => {
  res.status(500).send({
    code: 500,
    msg: "服务器内部错误"
  })
}

module.exports = {
  // 用户登录
  async login(req, res) {
    const { username, password } = req.body
    try {
      let userRes =  await User.findOne({
        where:{
          username,
          password
        }
      })
      if(!userRes){
        return res.send({
          code:400,
          msg:"用户名或密码错误"
        })
      }
      res.send({
        code:200,
        msg:'登录成功'
      })
      
    } catch (error) {
      serverError(res)
    }
  },
  // 用户退出
  logout(req, res) {
    res.send({
      code: 200,
      msg: "退出成功"
    })
  }
}
