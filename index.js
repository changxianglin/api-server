const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const usersRouter = new Router({prefix: '/users'})



router.get('/', (ctx) => {
    ctx.body = 'This is Home'
})

usersRouter.get('/', (ctx) => {
    ctx.body = 'This is usersList'
})

usersRouter.post('/', (ctx) => {
    ctx.body = 'This create user api'
})

usersRouter.get('/:id', (ctx) => {
    ctx.body = `This user ${ctx.params.id}`
})

app.use(router.routes())
app.use(usersRouter.routes())

app.listen(3000)