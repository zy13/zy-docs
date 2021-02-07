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

    let content = '';
    try {
        // /1.html
        // /a.1.html
        let lastPointIndex = url.lastIndexOf('.');
        // console.log('lastPointIndex', lastPointIndex);
        let ext = url.substring(lastPointIndex);
        // console.log('ext', ext);
        let mime = mimes[ext];
        // console.log('mime', mime);


        content = fs.readFileSync(`./assets${url}`);

        // 设置响应头：content-type
        res.writeHead(200, 'kkb:ok', {
            'content-type': `${mime};charset="utf-8"`
        });
    } catch (e) {
        // res.writeHead(404);
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