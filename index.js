const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const usersRouter = new Router({prefix: '/users'})

const auth = async (ctx, next) => {
    if(ctx.url !== '/users') {
        ctx.throw(401)
    }
    await next()
}

router.get('/', (ctx) => {
    ctx.body = 'This is Home'
})

usersRouter.get('/', (ctx) => {
    ctx.body = 'This is usersList'
})

usersRouter.post('/', auth, (ctx) => {
    ctx.body = 'This create user api'
})

usersRouter.get('/:id', auth, (ctx) => {
    ctx.body = `This user ${ctx.params.id}`
})

app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())

app.listen(3000)