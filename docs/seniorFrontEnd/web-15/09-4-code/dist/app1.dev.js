"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Koa = require('koa');

var KoaRouter = require('koa-router');

var koaStaticCache = require('koa-static-cache');

var koaBody = require('koa-body');

var koaConnection = require('./middleware/koa-connection');

var app = new Koa();
var router = new KoaRouter();
app.use(koaConnection());
app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}));
router.post('/login', koaBody(), function _callee(ctx) {
  var _JSON$parse, username, password, _ref, _ref2, _ref2$, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _JSON$parse = JSON.parse(ctx.request.body), username = _JSON$parse.username, password = _JSON$parse.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(ctx.connection.query('select * from `users` where `username`=? and `password`=?', [username, password]));

        case 3:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          _ref2$ = _slicedToArray(_ref2[0], 1);
          user = _ref2$[0];

          if (!user) {
            ctx["throw"](400);
          } else {
            // ctx.set('Set-Cookie', `uid=${user.id};max-age=1000`)
            // ctx.cookies.set('uid', JSON.stringify({
            //   uid: user.id,
            //   username: ''
            // }), {
            //   maxAge: ''
            // })
            ctx.cookies.set('uid', user.id, {
              maxAge: ''
            });
            ctx.body = {
              code: 200,
              msg: '登录成功'
            };
          }

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/register', koaBody(), function _callee2(ctx) {
  var _JSON$parse2, username, password;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _JSON$parse2 = JSON.parse(ctx.request.body), username = _JSON$parse2.username, password = _JSON$parse2.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(ctx.connection.query('insert into `users` (`username`, `password`) values (?, ?)', [username, password]));

        case 3:
          ctx.body = {
            code: 200,
            msg: '注册成功'
          };

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/users', function _callee3(ctx) {
  var uid, _ref3, _ref4, _ref4$, user;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // let uid = ctx.get('cookie')
          uid = ctx.cookies.get('uid');
          console.log(uid);
          _context3.next = 4;
          return regeneratorRuntime.awrap(ctx.connection.query('select * from `users` where `id`=?', [uid]));

        case 4:
          _ref3 = _context3.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          _ref4$ = _slicedToArray(_ref4[0], 1);
          user = _ref4$[0];
          ctx.body = JSON.stringify(user);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/users', koaBody(), function _callee4(ctx) {
  var name;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          name = ctx.request.body.name;

          if (!name) {
            ctx["throw"](400);
          }

          ctx.body = ctx.request.body;

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.get('/getPhotos', function (ctx) {});
app.use(router.routes());
app.listen(9999);