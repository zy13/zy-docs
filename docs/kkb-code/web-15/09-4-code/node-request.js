const http = require('http');

// 1.同源策略是浏览器端的安全机制
// 2.node进行跨域请求不受影响

(async () => {
  let rs = await request({
    method: 'get', 
    // hostname: 'www.baidu.com'
    hostname: 'localhost',
    port: 8888,
    path: '/users'
  })
  console.log(66, rs)
})();

function request(options) {
  return new Promise((resolve,reject) => {
    let req = http.request(options,(res)=>{
      let data = ''
      res.on('data', chunk => {
        data+=chunk
      })
      res.on('end', () => {
        resolve(data)
      })
    })

    req.write('')
    req.end()
  })
}

