const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

module.exports = (options) => {
    let opts = {
        viewsDir: path.resolve(__dirname, '../views/'),
        ...options,
    };

    const tpl = nunjucks.configure(opts.viewsDir, {
        autoescape: true,
        watch: true
    });

    // 这个才是中间件函数
    return async (ctx, next) => {
        ctx.render = (tplName, payload) => {
            let fileName = `${opts.viewsDir}/${tplName}.html`;
            // console.log('fileName', fileName);

            // ctx.body = nunjucks.renderString(
            //     fs.readFileSync(fileName).toString(),
            //     payload
            // )

            ctx.body = tpl.render(`${tplName}.html`, payload);
        }
        await next();
    }
}