const http = require('http')
const fs = require('fs')
const server = http.createServer()

server.on('request',(req,res)=>{
  let { url } = req;
  let content = '';

  if(url.startsWith('/public')) {
    try {
      content = fs.readFileSync(`.${url}`)
    } catch(e) {
      res.statusCode = 404
      content = 'not found'
    }
  } else {
    if(url === '/quote') {
      const quotes = [
        '虽然我个子矮，但我发际线高啊！',
        '有些事情做不完，就留到明天做吧。运气好的话，明天死了就不用做了。',
        '善良没用，你得漂亮。',
        '好好活下去 每天都有新打击。',
        '活着的时候把自己搞得好看一点，这样你就不会死得太难看。',
        '世上无难事 只要肯放弃。',
        '加油，你是最胖的！'
      ]
      // 随机取数组的数据
      // 方法一：quotes.sort(()=>Math.random() - 0.5)[0]
      let index = Math.floor(Math.random() * quotes.length)
      content = quotes[index]
      res.writeHead(200,{
        'content-type': 'text/html;charset=utf-8'
      })
    } else {
      res.statusCode = 404
      content = 'not found'
    }
  }  
  res.write(content)
  res.end()
})

server.listen(8888,'localhost',()=>{
  console.log('服务器启动成功')
})
// 作业
// - 1、使用node.js的http模块搭建一个webserver项目
//   - 1-1、端口8888
// - 2、访问 http://localhost:8888/public/index.html 返回 public 目录下的 index.html 内容
//   - 2-1、项目目录下创建一个 public 目录
//   - 2-2、public 下创建一个 index.html 文件（文件内容不限制）
// - 3、访问 http://localhost:8888/quote 随机返回一句毒鸡汤