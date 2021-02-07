"use strict";

var Koa = require('koa');

var koaStaticCache = require('koa-static-cache');

var KoaRouter = require('koa-router');

var jsonwebtoken = require('jsonwebtoken');

var app = new Koa();
var router = new KoaRouter();
app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
})); // 跨域解决方案一：设置请求头，设置允许跨域的源
// router.get('/users', async ctx => {
//   ctx.set('Access-Control-Allow-Origin', '*')
//   ctx.body = [
//     {id: 1, name: '张三'},
//     {id: 2, name: '李四'}
//   ]
// })
// 将token挂载到ctx

app.use(function _callee(ctx, next) {
  var token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = ctx.get('Authorization');

          try {
            ctx.state.token = jsonwebtoken.verify(token, 'kkb');
          } catch (e) {
            ctx["throw"](401);
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(next());

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/users', function _callee2(ctx) {
  var token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = ctx.state.tokenString;
          ctx.body = token;

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/login', function _callee3(ctx) {
  var user, tokenString;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // 验证用户是否登录成功
          user = {
            id: 1,
            name: 'zy'
          }; // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Inptb3VzZSIsImlhdCI6MTYxMjQyODA0M30.1gTPGAXMqdVWPlv1sAb3jcmHlbNcUFotpjueaz_CgWA

          tokenString = jsonwebtoken.sign(user, 'kkb');
          ctx.set('Authorization', tokenString);
          ctx.body = tokenString;

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.use(router.routes());
app.listen(8888);