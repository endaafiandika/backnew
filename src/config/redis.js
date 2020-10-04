const redis = require ('redis')

class Redis {
    constructor() {
        this.redisdb = redis.createClient ({
            host : process.env.REDIS_HOST,
            port : process.env.REDIS_PORT,
            password : process.env.REDIS_PASSWORD,
        })
    }

    redisCheck() {
        return new Promise ((resolve, reject) => {
            this.redisdb.get("testkey", (err, res) => {

                if (err) {
                    reject('redis not connect')
                }
                if (res == null || res =='OK') {
                    resolve('redis connect')
                }
            })
        })
    }
}

module.exports = new Redis()