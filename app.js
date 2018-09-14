const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

let app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    ctx.response.type = 'json';
    await next();
});


app.use(controller());
app.listen(3000);
console.log('serve is started at http://localhost:3000');
