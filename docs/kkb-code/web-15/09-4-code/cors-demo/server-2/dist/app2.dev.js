"use strict";

var Koa = require('koa');

var koaStaticCache = require('koa-static-cache');

var KoaRouter = require('koa-router');

var proxy = require('koa-server-http-proxy');

var app = new Koa();
var router = new KoaRouter(); // 跨域解决方案三：利用koa-server-http-proxy中间件
// 对当前的代理进行转发

app.use(proxy('/server1', {
  target: 'http://localhost:8888',
  pathRewrite: {
    '^/server1': ''
  },
  changeOrigin: true // 是否处理cookie跨域问题

}));
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
});
app.use(router.routes());
app.listen(9999);