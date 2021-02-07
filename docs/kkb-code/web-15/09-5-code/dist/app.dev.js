"use strict";

var Koa = require('koa');

var Router = require('koa-router');

var koaStatic = require('koa-static-cache');

var koaBody = require('koa-body');

var koaJwt = require('koa-jwt');

var jsonwebtoken = require('jsonwebtoken');

var app = new Koa();
var router = new Router();
var key = 'kkb';
app.use(koaStatic({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}));
app.use(koaJwt({
  secret: key
}).unless({
  path: [/^\/login/]
}));
app.use(koaBody({
  multipart: true
}));
router.post('/login', function _callee(ctx) {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            user = {
              id: 1,
              username: 'zy',
              password: '123'
            };
            token = jsonwebtoken.sign(user, key);
            ctx.set('Authorization', "Bearer ".concat(token));
            ctx.body = '登录成功';
          } catch (e) {
            ctx["throw"](401);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}); // 获取数据

router.get('/users', function _callee2(ctx) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // let token = ctx.cookies.get('')
          ctx.body = {
            id: 1,
            username: 'zy'
          };

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.use(router.routes());
app.listen(8888);