"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Koa = require('koa');

var Router = require('koa-router');

var koaStaticCache = require('koa-static-cache');

var mysql = require('./middleware/koa-connection');

var koaBody = require('koa-body');

var jwt = require('koa-jwt');

var jsonwebtoken = require('jsonwebtoken');

var app = new Koa();
var router = new Router(); // 连接数据库

app.use(mysql()); // 静态资源代理

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
})); // 解析表单数据

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: './public/avatars',
    keepExtensions: true
  }
})); // 验证 jsonwebtoken

app.use(jwt({
  secret: 'kkb'
}).unless({
  path: [/login/]
}));
router.get('/getPhotos', function _callee(ctx) {
  var id, _ref, _ref2, avatars;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = ctx.state.user.id; // 获取用户id

          if (ctx.get('Authorization')) {
            _context.next = 5;
            break;
          }

          throw 401;

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(ctx.connection.query( // 根据用户id查询所有关联的图片数据
          'select path from `attachments` where `uid`=?', [id]));

        case 7:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          avatars = _ref2[0];
          ctx.body = avatars;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/login', function _callee2(ctx) {
  var _JSON$parse, username, password, _ref3, _ref4, _ref4$, user, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _JSON$parse = JSON.parse(ctx.request.body), username = _JSON$parse.username, password = _JSON$parse.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(ctx.connection.query( // 从表users中获取账号密码
          'select * from `users` where `username`=? and `password`=?', [username, password]));

        case 3:
          _ref3 = _context2.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          _ref4$ = _slicedToArray(_ref4[0], 1);
          user = _ref4$[0];

          if (user) {
            // 账号存在，生成token返回给前端
            token = jsonwebtoken.sign(_objectSpread({}, user), 'kkb');
            ctx.body = {
              code: 200,
              token: token
            };
          } else {
            ctx.body = {
              code: 400,
              msg: '账号或者密码错误！'
            };
          }

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/upload', function _callee3(ctx) {
  var id, _ctx$request$files$at, filename, size, path, type, _ref5, _ref6, _ref6$, avatars;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = ctx.state.user.id;
          _ctx$request$files$at = ctx.request.files.attachment, filename = _ctx$request$files$at.name, size = _ctx$request$files$at.size, path = _ctx$request$files$at.path, type = _ctx$request$files$at.type;

          if (ctx.get('Authorization')) {
            _context3.next = 6;
            break;
          }

          ctx["throw"](401);
          _context3.next = 15;
          break;

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(ctx.connection.query('select * from `attachments` where `uid`=?', [id]));

        case 8:
          _ref5 = _context3.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          _ref6$ = _slicedToArray(_ref6[0], 1);
          avatars = _ref6$[0];
          _context3.next = 14;
          return regeneratorRuntime.awrap(ctx.connection.query('insert into `attachments` (`uid`,`filename`,`size`,`path`, `type`) values (?,?,?,?,?)', [id, filename, size, path, type]));

        case 14:
          ctx.body = '/' + path;

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.use(router.routes());
app.listen(8888);