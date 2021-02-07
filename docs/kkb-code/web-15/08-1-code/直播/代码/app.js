// 引入 http 模块
const http = require('http');
// 引入 fs 模块
const fs = require('fs');
// 引入mime对象
const mimes = require('./mime.json');
// console.log('mimes', mimes);
// 引入模板引擎
const nunjucks = require('./nunjucks');

// let res = nunjucks.renderString('Hello {{ username }}', { username: 'James' });
// console.log('res', res);
// nunjucks.configure('views', {
//     autoescape: true,
//     watch: true,
//     noCache: true
// });

// const tpl = new nunjucks.Environment(
//     new nunjucks.FileSystemLoader('views'),
//     {
//         autoescape: true,
//         watch: true,
//         noCache: true
//     }
// )


let users = [
    {
        id: 1,
        name: 'hai'
    },
    {
        id: 2,
        name: 'zMouse'
    }
]

const server = http.createServer();

server.on('request', (req, res) => {

    let { url } = req;

    let content = '';

    if (url.startsWith('/public')) {
        try {
            url = url.replace(/^\/public/, '');
            let lastPointIndex = url.lastIndexOf('.');
            let ext = url.substring(lastPointIndex);
            let mime = mimes[ext];
            content = fs.readFileSync(`./assets${url}`);
            res.writeHead(200, 'kkb:ok', {
                'content-type': `${mime};charset="utf-8"`
            });
        } catch (e) {
            res.statusCode = 404;
            content = 'Not Found';
        }
    } else {
        if (url === '/getdate') {
            res.writeHead(200, {
                'content-type': 'text/html;charset=utf-8'
            });
            content = `当前系统时间：${new Date()}`;
        }

        if (url === '/users') {
            res.writeHead(200, {
                'content-type': 'text/html;charset=utf-8'
            });

            content = nunjucks.renderString(
                fs.readFileSync('./views/users.html').toString(),
                {
                    title: '用户列表',
                    users
                }
            );
            console.log('content', content);
        }
    }


    res.write(content);

    res.end();
});


// 监听网卡（网络）
server.listen(8888, '0.0.0.0', () => {
    console.log('服务器启动成功');
});