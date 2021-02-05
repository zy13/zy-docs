const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

module.exports = (options) => {
    let opts = {
        viewsDir: path.resolve(__dirname, '../views/'),
        ...options,
    };

    // 这个才是中间件函数
    return async (ctx, next) => {
        ctx.render = (tplName, payload) => {
            let fileName = `${opts.viewsDir}/${tplName}.html`;
            // console.log('fileName', fileName);

            ctx.body = nunjucks.renderString(
                fs.readFileSync(fileName).toString(),
                payload
            )
        }
        await next();
    }
}