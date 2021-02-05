// Koa => node_modules/koa/lib/application.js => class Application
const Koa = require('koa');
// const fs = require('fs');
// const mimes = require('./mime.json');
const staticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

// 初始化一个 Application 对象
const app = new Koa();

// app.use(async (ctx, next) => {
//     // 鉴权
//     console.log('11111');

//     await next();

//     console.log('aaaaaa');

//     ctx.body = 'Hello';
// });

// app.use(() => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log('22222');
//             resolve();
//         }, 0);
//     });
// });


// 每一个中间件处理一个具体的业务

// 专门用来处理静态文件代理的中间件
// app.use(async (ctx, next) => {
//     if (ctx.url.startsWith('/public')) {
//         let lastPointIndex = ctx.url.lastIndexOf('.');
//         let suffix = ctx.url.substring(lastPointIndex);
//         let mime = mimes[suffix];
//         // res.writeHead(200, {
//         //     'Content-Type': `${mime};charset="utf-8"`
//         // })
//         ctx.set('content-type', `${mime};charset="utf-8"`);
//         ctx.body = fs.readFileSync(`.${ctx.url}`);
//     } else {
//         await next();
//     }
// });

app.use(staticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

// app.use(async (ctx, next) => {
//     if (ctx.url == 'register') {
//         ctx.body = '注册';
//     }
//     if (ctx.url === 'login') {
//         ctx.body = '登录'
//     }
// });


const router = new KoaRouter();

// 为 router 去根据不同的url和请求方法（get、post）去注册不同的函数
router.get('/register', async (ctx, next) => {
    ctx.body = '注册';
});

router.get('/login', async (ctx, next) => {
    ctx.body = '登录';
});


app.use(router.routes());


// Application { http.Server ...  .... .. } => Application 方法
// 监听指定端口 => 间接的创建了一个 http.Server 并调用其 listen 方法
app.listen(8888);


// function fn1() {
//     console.log('这是我原来做的事情');
// }

// // framework => 让fn1做的事情更多一下
// function fn2() {
//     console.log('做更多的事情');
//     fn1();
// }

// fn2();


// 关于 compose => middleware [fn1, fn2, fn3]
// Promise.resolve(fn1).then(fn2).then(fn3) 不是这个逻辑，fn1执行完成以后会自动执行then的fn2然后then的fn3，这么做是没有办法控制fn的执行的，如果我在fn1中执行完成了任务，返现不需要，不允许继续向后执行，那么……
// Promise.resolve(fn1(fn2(fn3))); 执行fn1，然后下一个任务不是自动执行，他会在fn1的内部逻辑中选择性的去执行fn2


// function fn1() {
//     console.log('111');

//     fn2();

//     console.log('aaaa');
// }

// function fn2() {
//     console.log('2222');
// }