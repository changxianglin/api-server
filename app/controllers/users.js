const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user.js')
const { secret } = require('../config.js')

class UsersCtl {
    async find(ctx) {
        ctx.body = await User.find()
    }
    async findById(ctx) {
        const { fields } = ctx.request.query
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join()
        const user = await User.findById(ctx.params.id).select(selectFields)
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
    async checkOwner(ctx, next) {
        if(ctx.params.id !== ctx.state.user._id) { ctx.throw(403, 'no auth!!!')}
        await next()
    }
    async update(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: false},
            password: {type: 'string', required: false},
            avatar_url: { type: 'string', required: false},
            gender: { type: 'string', required: false },
            headline: { type: 'string', required: false },
            locations: { type: 'array', itemType: 'string', required: false },
            business: { type: 'string', required: false },
            employments: { type: 'array', itemType: 'object', required: false},
            educations: { type: 'array', itemType: 'object', required: false},
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
    async listFollowing(ctx) {
        const user = await User.findById(ctx.params.id).select('+following').populate('following')
        if(!user) {ctx.throw(404)}
        ctx.body = user.following
    }
    async following(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+following')
        if(!me.following.map(id => id.toString()).includes(ctx.params.id)) {
            me.following.push(ctx.params.id)   
            me.save()
        } 
        ctx.status = 204
    }
    async follower(ctx) {
        const users = await User.find({ following: ctx.params.id})
        ctx.body = users
    }
    async unfollowing(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+following')
        const index = me.following.map(id => id.toString()).indexOf(ctx.params.id)
        if(index > -1) {
            me.following.splice(index, 1)   
            me.save()
        } 
        ctx.status = 204
    }
}

module.exports = new UsersCtl()