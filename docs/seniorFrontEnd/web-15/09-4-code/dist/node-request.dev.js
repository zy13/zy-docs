"use strict";

var http = require('http'); // 1.同源策略是浏览器端的安全机制
// 2.node进行跨域请求不受影响


(function _callee() {
  var rs;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(request({
            method: 'get',
            // hostname: 'www.baidu.com'
            hostname: 'localhost',
            port: 8888,
            path: '/users'
          }));

        case 2:
          rs = _context.sent;
          console.log(66, rs);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
})();

function request(options) {
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
}