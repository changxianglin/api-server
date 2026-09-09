const Koa = require('koa')
const app = new Koa()

app.use((ctx) => {
    ctx.body = 'Hello Zhihu';
})

app.listen(3000)