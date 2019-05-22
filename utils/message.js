
module.exports = {
  invalidParameter(req,msg='参数无效，请检查'){
    req.send({
      msg,
      code:400
    })
  }
}