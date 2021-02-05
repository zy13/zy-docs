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
var router = new KoaRouter(); // 连接数据库

app.use(koaConnection({
  host: 'localhost',
  user: 'root',
  database: 'kkb_15',
  port: 3307
})); // 静态资源代理

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
})); // 获取图片接口

router.get('/getPhotos', function _callee(ctx) {
  var _ref, _ref2, attachments;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ctx.connection.query('select * from `attachments`'));

        case 2:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          attachments = _ref2[0];
          ctx.body = attachments;

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); // 文件上传接口

router.post('/upload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: './public/upload',
    keepExtensions: true
  }
}), function _callee2(ctx) {
  var _ctx$request$files$at, filename, size, type, path;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _ctx$request$files$at = ctx.request.files.attachment, filename = _ctx$request$files$at.name, size = _ctx$request$files$at.size, type = _ctx$request$files$at.type, path = _ctx$request$files$at.path; // 将图片存入数据库

          _context2.next = 3;
          return regeneratorRuntime.awrap(ctx.connection.query('insert into `attachments` (`filename`, `size`, `type`, `path`) values (?, ?, ?, ?)', [filename, size, type, path]));

        case 3:
          // 返回图片路径给前端
          ctx.body = '/' + path;

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.use(router.routes());
app.listen(9999);