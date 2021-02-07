// 引入 http 模块
const http = require('http');
// 引入 fs 模块
const fs = require('fs');

const server = http.createServer();

server.on('request', (req, res) => {


    // url 是网络中用来标识一个资源的虚拟地址
    if (req.url === '/') {
        let content = fs.readFileSync('./assets/1.html').toString();
        res.write(content);
    } else if (req.url === '/register') {
        let content = fs.readFileSync('./assets/hello.txt').toString();
        res.write(content);
    } else {
        res.write(`Not Found ${new Date()}`);
    }


    res.end();
});


// 监听网卡（网络）
server.listen(8888, '0.0.0.0', () => {
    console.log('服务器启动成功');
});