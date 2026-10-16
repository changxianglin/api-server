const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user.js')
const { secret } = require('../config.js')

class UsersCtl {
    async find(ctx) {
        ctx.body = await User.find()
    }
    async findById(ctx) {
        const user = await User.findById(ctx.params.id)
        if(!user) { ctx.throw(404, 'unIncluded user')}
        ctx.body = user
    }
    async create(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: true},
            password: {type: 'string', required: true},
        })
        const { name } = ctx.request.body
        const repeatedUser = await User.findOne({ name })
        if(repeatedUser) { ctx.throw(409, 'user arealy used' )}
        const user = await new User(ctx.request.body).save()
        ctx.body = user
    }
    async update(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: false},
            password: {type: 'string', required: false},
        })
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        if(!user) { ctx.throw(404, 'unIncluded user')}
        ctx.body = user
    }
    async delete(ctx) {
        const user = await User.findByIdAndDelete(ctx.params.id)
        if(!user) { ctx.throw(404, 'unIncluded user')}
        ctx.status = 204
    }
    async login(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true },
        })
        const user = await User.findOne(ctx.request.body)
        if(!user) { ctx.throw(401, 'user or password error')}
        const { name, _id } = user
        const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' })
        ctx.body = { token }
    }
}

module.exports = new UsersCtl()