const { Category } = require("../db")

const serverError = res => {
  res.status(500).send({
    code: 500,
    msg: "服务器内部错误"
  })
}

module.exports = {
  // 用户登录
  login(req, res) {
    const { username, password } = req.body
    if (username == "admin" && password == 123456) {
      res.send({
        code: 200,
        msg: "登录成功"
      })
    } else {
      res.send({
        code: 400,
        msg: "用户名或密码错误"
      })
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
