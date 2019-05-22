
module.exports = {
  invalidParameter(req,msg){
    req.send({
      msg:`${msg} 参数无效,请检查'`,
      code:400
    })
  }
}