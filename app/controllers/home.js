class HomeCtl {
    index(ctx) { 
        ctx.body = 'This is Home'
    }
}

module.exports = new HomeCtl()