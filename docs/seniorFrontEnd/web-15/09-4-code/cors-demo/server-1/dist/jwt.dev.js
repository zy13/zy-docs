"use strict";

var Koa = require('koa');

var koaStaticCache = require('koa-static-cache');

var KoaRouter = require('koa-router');

var jsonwebtoken = require('jsonwebtoken');

var jwt = require('koa-jwt');

var app = new Koa();
var router = new KoaRouter();
app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
})); // 验证 jsonwebtoken

app.use(jwt({
  secret: 'kkb'
}).unless({
  path: [/^login/]
}));
router.get('/users', function _callee(ctx) {
  var token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = ctx.state.tokenString;
          console.log(ctx.state.user);
          ctx.body = token;

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/login', function _callee2(ctx) {
  var user, tokenString;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
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
          return _context2.stop();
      }
    }
  });
});
app.use(router.routes());
app.listen(8888);