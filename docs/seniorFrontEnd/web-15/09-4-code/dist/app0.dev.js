"use strict";

var Koa = require('koa');

var Router = require('koa-router');

var koaStaticCache = require('koa-static-cache');

var app = new Koa();
var router = new Router(); // app.use(async (ctx,next) => {
//   if(!ctx.cookies.get('token')) {
//     ctx.cookies.set('token', '123456789')
//   }
//   console.log(7777, ctx.cookies.get('token'))
//   await next()
// })

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
            name: '123'
          }];

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.use(router.routes());
app.listen(8888);