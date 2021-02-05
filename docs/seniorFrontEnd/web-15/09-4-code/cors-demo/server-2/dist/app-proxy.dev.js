"use strict";

var Koa = require('koa');

var koaStaticCache = require('koa-static-cache');

var KoaRouter = require('koa-router');

var http = require('http');

var app = new Koa();
var router = new KoaRouter();
app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}));
router.get('/users', function _callee(ctx) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ctx.body = [{
            id: 1,
            name: '张三'
          }, {
            id: 2,
            name: '李四'
          }];

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}); // 跨域解决方案二：后端代理，原理是node端跨域请求不受浏览器跨域同源安全策略的影响，
// 也就是在node端发送请求不存在跨域问题，跨域请求问题是存在于浏览器端的同源安全策略

router.get('/server1/users', function _callee2(ctx) {
  var rs;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(nodeRequest({
            method: 'get',
            hostname: 'localhost',
            port: 8888,
            path: '/users'
          }));

        case 2:
          rs = _context2.sent;
          console.log(rs);
          ctx.body = rs;

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // 代理 - 转发浏览器的请求：利用http模块实现简单的服务器转发

function nodeRequest(options) {
  return new Promise(function (resolve, reject) {
    var req = http.request(options, function (res) {
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        resolve(data);
      });
    });
    req.write('');
    req.end();
  });
} // 跨域解决方案三：利用koa-server-http-proxy中间件


app.use(router.routes());
app.listen(9999);