const http = require('http');
const mimes = require('./mime.json');
const fs = require('fs');

const quotes = [

    '虽然我个子矮，但我发际线高啊！',

    '有些事情做不完，就留到明天做吧。运气好的话，明天死了就不用做了。',

    '善良没用，你得漂亮。',

    '好好活下去 每天都有新打击。',

    '活着的时候把自己搞得好看一点，这样你就不会死得太难看。',

    '世上无难事 只要肯放弃。',

    '加油，你是最胖的！'
];


const server = http.createServer((req, res) => {
    // 业务逻辑

    let content = '';

    if (req.url.startsWith('/public')) {
        // 静态资源的代理
        // 根据当前访问的文件的后缀来自动返回一个 content-type 的头信息
        let lastPointIndex = req.url.lastIndexOf('.');
        let suffix = req.url.substring(lastPointIndex);
        let mime = mimes[suffix];
        res.writeHead(200, {
            'Content-Type': `${mime};charset="utf-8"`
        })
        // /public/index.html => ./public/index.html 
        content = fs.readFileSync(`.${req.url}`);
        // res.write(content);
    } else {
        // 动态资源的代理
        if (req.url === '/quote') {
            res.writeHead(200, {
                'Content-Type': 'text/html;charset="utf-8"'
            })
            content = quotes.sort(() => Math.random() - .5)[0];
            content = `<h1 style="color:green">${content}</h1>`;
            // res.write(content);
        }
    }

    // res.write(content);
    res.end(content);

});

// server.on('request', (req, res) => {

// })

server.listen(8888);