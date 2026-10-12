const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const app = new Koa()
const routing = require('./routes')

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.status = error.status || error.statusCode || 500
        ctx.body = {
            message: error.message
        }
    }
})
app.use(bodyparser())
routing(app)

app.listen(3000, () => console.log('app api work 3000 port !!!'))