const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const { 
    find, findById, create, 
    update, delete: del, checkOwner,
    login, listFollowing, following, 
    unfollowing, follower, checkUserExist } = require('../controllers/users')
const { secret } = require('../config')

const auth = jwt({ secret })

router.get('/', find)

router.post('/', create)

router.get('/:id', findById)

router.patch('/:id', auth, checkOwner, update)

router.delete('/:id', auth, checkOwner, del)

router.post('/login', login)

router.get('/:id/following', listFollowing)

router.get('/:id/follower', follower)

router.put('/following/:id', auth, checkUserExist, following)

router.delete('/following/:id', auth, checkUserExist, unfollowing)

module.exports = router