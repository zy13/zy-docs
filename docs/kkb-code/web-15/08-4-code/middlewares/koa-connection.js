const mysql = require('mysql2/promise');

let connection;

module.exports = (configs) => {

    return async (ctx, next) => {
        // 判断一下connection是否已经存在，如果不存在则链接数据库
        if (!connection) {
            connection = await mysql.createConnection(configs);
        }

        ctx.connection = connection;

        // console.log(ctx.connection);

        await next();
    }
}