const http = require('http')
const server = http.createServer((req,res) => {
  res.write('hello world -123')
  res.end()
})
server.listen(3000)

// require: 引入模块的语法糖
// commonJs 模块化