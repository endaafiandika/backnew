const redis = require('../config/redis')

const getAll = (req, res, next) => {
    redis.redisdb.get("produkAll", (err, ress) => {

        if (err) {
            res.send(err)
        }
        if (ress !== null) {
            const data = JSON.parse(ress)
            return res.send(data)
        } else {
            next()
        }
    })
}

module.exports = getAll