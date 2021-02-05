"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Koa = require('koa');

var koaStaticCache = require('koa-static-cache');

var koaBody = require('koa-body');

var KoaRouter = require('koa-router');

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
          ctx.set('Access-Control-Allow-Origin', '*');
          ctx.body = [{
            id: 1,
            name: '张三'
          }, {
            id: 2,
            name: '李四'
          }];

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/users', koaBody(), function _callee2(ctx) {
  var _JSON$parse, name;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _JSON$parse = JSON.parse(ctx.request.body), name = _JSON$parse.name;
          console.log(123, _typeof(ctx.request.body), name);
          ctx.body = [{
            id: 1,
            name: '张三'
          }, {
            id: 2,
            name: '李四'
          }];

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.use(router.routes());
app.listen(8888);