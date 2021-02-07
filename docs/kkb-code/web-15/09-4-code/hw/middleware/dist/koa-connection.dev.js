"use strict";

var mysql = require('mysql2/promise');

var connection;
var configs = {
  host: 'localhost',
  user: 'root',
  database: 'kkb_15',
  port: 3307
};

module.exports = function () {
  return function _callee(ctx, next) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (connection) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return regeneratorRuntime.awrap(mysql.createConnection(configs));

          case 3:
            ctx.connection = _context.sent;

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(next());

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};