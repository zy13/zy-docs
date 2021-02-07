// 引入 http 模块
const http = require('http');
// 引入 fs 模块
const fs = require('fs');
// 引入mime对象
const mimes = require('./mime.json');
// console.log('mimes', mimes);

const server = http.createServer();

server.on('request', (req, res) => {


    // webserver制定一套静态资源访问的规则，这样就方便url的访问
    // console.log('url', req.url);

    let { url } = req;


    // 如果我们的应用有动态资源和静态资源同时存在，那么最好把静态资源的访问规则和动态资源的访问规则进行一个区分

    let content = '';

    // 先写动态资源的规则
    if (url === '/getdate') {
        res.writeHead(200, {
            'content-type': 'text/html;charset=utf-8'
        });
        res.write(`当前系统时间：${new Date()}`);
        res.end();
        return;
    }

    try {
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

    res.write(content);


    res.end();
});


// 监听网卡（网络）
server.listen(8888, '0.0.0.0', () => {
    console.log('服务器启动成功');
});