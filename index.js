const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()
const usersRouter = new Router({prefix: '/users'})

router.get('/', (ctx) => {
    ctx.body = 'This is Home'
})

usersRouter.get('/', (ctx) => {
    ctx.body = [{name: 'Json'}, {name: 'Jim'}]
})

usersRouter.post('/', (ctx) => {
    ctx.body = {name: 'Json'}
})

usersRouter.get('/:id', (ctx) => {
    ctx.body = {name: 'Json'}
})

usersRouter.put('/:id', (ctx) => {
    ctx.body = {name: 'Json2'}
})

usersRouter.delete('/:id', (ctx) => {
    ctx.status = 204
})

app.use(bodyparser())
app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())

app.listen(3000)