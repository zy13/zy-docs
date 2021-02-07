const mysql = require('mysql2/promise');
let connection;

let configs = {
  host: 'localhost',
  user: 'root',
  database: 'kkb_15',
  port: 3307
}

module.exports = () => {
  return async (ctx, next) => {
    if (!connection) {
      ctx.connection = await mysql.createConnection(configs)
    }
    await next()
  }
}