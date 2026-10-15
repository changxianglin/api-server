const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const app = new Koa()
const routing = require('./routes')
const { connectionStr } = require('./config')

mongoose.connect(connectionStr)
mongoose.connection.on('error', console.error)

app.use(error({
    postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : { stack, ...stack }
}))
app.use(bodyparser())
app.use(parameter(app))
routing(app)

app.listen(3000, () => console.log('app api work 3000 port !!!'))