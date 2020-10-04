const model = require('../model/users')
const bcr = require ('bcrypt')
const jwt = require ('jsonwebtoken')

class Auth {
    login = async (req, res) => {
        try {
            const passDB = await model.get(req.body.username)

            if (passDB.length <= 0) {
                return res.send("username tidak ada")  
            }

            const passReq = req.body.password
            const check = await bcr.compare(passReq, passDB[0].password)

            if (check) {
                const result = await this.setToken(passDB[0].status)
                console.log(result)
                return res.send(result)  
            } else {
                return res.send("gagal login")  
            }
            
        } catch (error) {
            return res.send(error)
        }

    }

setToken = async (status) => {
    try {
        const payload = {
            status: status,      
        }
        
        console.log(payload)
        const token = jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: 60})
    
        const result = {
            token : token,
            msg : 'token created, login done'
        }
        return result
    } catch (error) {
        throw error
    }
}   

}

module.exports = new Auth()