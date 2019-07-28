const { Comment } = require("../db")

const serverError = res => {
  res.status(500).send({
    code: 500,
    msg: "服务器内部错误"
  })
}

module.exports = {
    post_comment(req,res){
       res.send('/post_comment')
    }
}