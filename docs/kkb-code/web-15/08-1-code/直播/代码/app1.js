// 引入 http 模块
const http = require('http');

// 创建一个 Server 对象
// const server = new http.Server();
// const server = http.Server();

const server = http.createServer();

// 注册请求后的回调函数，这个函数就是每次接受到请求以后要完成的任务逻辑
server.on('request', (req, res) => {
    console.log('我接收到了一个请求');

    // 根据不同的 url 返回不同的内容
    console.log('url', req.url);

    if (req.url === '/') {
        res.write('Index');
    } else if (req.url === '/register') {
        res.write('register');
    } else {
        res.write(`Not Found ${new Date()}`);
    }


    // res.write('Hello');
    res.end();
});


// 监听网卡（网络）
server.listen(8888, '0.0.0.0', () => {
    console.log('服务器启动成功');
});