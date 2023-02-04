const os = require('os')

module.exports = function (req, res, next) {
    const freeMemoryMB = os.freemem() / 1048576

    if (freeMemoryMB < process.env.RATE_LIMITER_MEMORY) {
        res.locals.error = 'En estos momentos nuestro sistemas se encuentran con mucho trafico, intente mas tarde.'
        return res.render('error')
    }

    next()
}

