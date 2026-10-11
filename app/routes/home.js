const Router = require('koa-router')
const router = new Router()

router.get('/', (ctx) => {
    ctx.body = 'This is Home'
})

module.exports = router