const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

const checkToken = (req, res, next) => {
    const {token} = req.headers

    if (!token) {
        const result = {
            msg: 'please login',
        }
        return res.send(result)
    }

    const jwtToken = jwtDecode(token) 
    const userRole = jwtToken.status
    console.log(userRole)

    jwt.verify(token, process.env.JWT_KEYS, (err, decode) => {
        if (err) {
            const result = {
                msg: 'login'
                
            }
            return res.send(result)
        }
        if(userRole !== "admin"){
            const result = {
                msg : 'Anda Bukan Admin'
            }
            return res.send(result)
        }
        next()
    })
}

module.exports = checkToken