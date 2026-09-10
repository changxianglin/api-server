const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

router.get('/', (ctx) => {
    ctx.body = 'This is Home'
})

router.get('/users', (ctx) => {
    ctx.body = 'This is usersList'
})

router.post('/users', (ctx) => {
    ctx.body = 'This create user api'
})

router.get('/users/:id', (ctx) => {
    ctx.body = `This user ${ctx.params.id}`
})

app.use(router.routes())

app.listen(3000)