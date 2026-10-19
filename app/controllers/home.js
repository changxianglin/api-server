const path = require('path')

class HomeCtr {
    index(ctx) {
        ctx.body = '<h1> This is HomePage </h1>'
    }
    upload(ctx) {
        const file = ctx.request.files.file
        const basename = path.basename(file.filepath)
        ctx.body = {url: `${ctx.protocol}://${ctx.host}/uploads/${basename}`}
    }
}

module.exports = new HomeCtr