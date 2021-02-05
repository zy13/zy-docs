const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
// const nunjucks = require('nunjucks');
// const fs = require('fs');
const koaNunjucks = require('./middlewares/koa-nunjucks');
const path = require('path');
// const categories = require('./data/categories.json');
// console.log('categories', categories);
const koaConnection = require('./middlewares/koa-connection');
const koaBody = require('koa-body');

const app = new Koa();

// 静态资源代理
app.use(koaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

// 数据库链接
app.use(koaConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'kkb_15'
    }
));

// 动态资源
const router = new KoaRouter();
// 载入模板中间件
app.use(koaNunjucks({
    viewsDir: path.resolve(__dirname, 'views')
}));

// 首页
router.get('/', async ctx => {

    let [categories] = await ctx.connection.query(
        "select * from `categories`"
    );
    // console.log('categories', categories);

    let [items] = await ctx.connection.query(
        "select * from `items` limit 10"
    );

    ctx.render('index', {
        categories,
        items
    });
});

// 列表
router.get('/list/:categoryId', async ctx => {
    // 因为这个url需要请求过程中再携带一些动态的额外数据，这个数据会影响当前从数据库中查询的结果
    // 客户端发送请求可以携带数据：1、url，2、通过请求头，3、通过请求正文
    // koa-router 会在分析当前动态url的时候，把 /list/1或者/list/2后面与:匹配的内容单独解析出来，然后存放到 req.request.params.categoryId
    let { categoryId } = ctx.request.params;
    // console.log('categoryId', categoryId);
    let [categories] = await ctx.connection.query(
        "select * from `categories`"
    );

    let [items] = await ctx.connection.query(
        "select * from `items` where `category_id`=?",
        [categoryId]
    );

    ctx.render('list', {
        categories,
        items
    });
});

router.get('/detail/:itemId', async ctx => {
    let { itemId } = ctx.request.params;

    let [categories] = await ctx.connection.query(
        "select * from `categories`"
    );

    let [[item]] = await ctx.connection.query(
        "select * from `items` where `id`=?",
        [itemId]
    );

    ctx.render('detail', {
        categories,
        item
    });
});

router.post('/comment', koaBody(), async ctx => {
    // 默认情况下，koa 不会post提交的正文请求中的数据进行解析
    let { content, itemId } = ctx.request.body;
    // console.log('content', content);
    // console.log('itemId', itemId);

    // console.log('Date.now()', `${Date.now()}`.length);

    let [rs] = await ctx.connection.query(
        "insert into `comments` (`content`, `datetime`, `item_id`) values (?, ?, ?)",
        [content, Date.now(), itemId]
    );

    ctx.body = '评论成功';
})


// router.get('/register')
// router.post('/register')

router.get('/test', async ctx => {
    // ctx.body = nunjucks.renderString(fs.readFileSync('./views/test.html').toString(), {
    //     title: '开课吧'
    // });

    ctx.render('test', {
        title: '开课吧'
    });
})

app.use(router.routes());

app.listen(8888);