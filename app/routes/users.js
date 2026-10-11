const Router = require('koa-router')
const router = new Router({prefix: '/users'})

const db = [{name: 'Jack',}]

router.get('/', (ctx) => {
    ctx.body = db
})

router.post('/', (ctx) => {
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
})

router.get('/:id', (ctx) => {
    ctx.body = db[ctx.params.id * 1]
})

router.put('/:id', (ctx) => {
    db[ctx.params.id * 1] = ctx.request.body
    ctx.body = ctx.request.body
})

router.delete('/:id', (ctx) => {
    console.log(ctx.params.id * 1)
    db.splice(ctx.params.id * 1, 1)
    console.log(db)
    ctx.status = 204
})

module.exports = router