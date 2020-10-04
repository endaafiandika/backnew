const model = require('../model/users')
const hashPassword = require('../helpers/hash')
const users = {}

users.All = async (req, res) => {
    try {
        const data = await model.GetAll()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}

users.Add = async ( req, res ) => {
    try {
        const passHash = await hashPassword(req.body.password)
        const datas = {
            username: req.body.username,
            password: passHash,
            status: req.body.status
        }
        const data = await model.add(datas)
        return res.send(datas)   
    } catch (error) {
        return res.send(req.body)
    }
},

users.search = async (req, res) => {
    try {
        const username = req.query.username
        const data = await model.get(username)
        if(data == ''){
        return res.status(200).json('Data Tidak Ada')
    } else {
        return res.status(200).json(data)
    }
    } catch (error) {
        return res.status(500).json("Error")
        
    }
},

module.exports = users