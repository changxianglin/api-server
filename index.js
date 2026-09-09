const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    if(ctx.url === '/') {
        ctx.body = 'This is Home'
    } else if(ctx.url === '/users') {
        if(ctx.method === 'GET') {
            ctx.body = 'This users list'
        } else if(ctx.method === 'POST') {
            ctx.body = 'Create user'
        } else {
            ctx.status = 405
        }
    } else if(ctx.url.match(/\/users\/\w+/)) {
        const userId = ctx.url.match(/\/users\/(\w+)/)[1]
        ctx.body = `This userId ${userId}`
    } else {
        ctx.status = 404
    }
})

app.listen(3000)