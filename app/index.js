const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const app = new Koa()
const routing = require('./routes')

app.use(error({
    postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : { stack, ...stack }
}))
app.use(bodyparser())
app.use(parameter(app))
routing(app)

app.listen(3000, () => console.log('app api work 3000 port !!!'))