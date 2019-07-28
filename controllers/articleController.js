const { Category } = require("../db")

const serverError = res => {
  res.status(500).send({
    code: 500,
    msg: "服务器内部错误"
  })
}

module.exports = {
  async publish(req,res){
    res.send('/public')
  }
}
