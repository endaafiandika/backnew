const model = require('../model/history')
const redis = require('../config/redis')
const history = {}

history.All = async (req, res) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("produkAll", 50, data_redis)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}

history.Add = async ( req, res ) => {
    try {
        const {invoice, cashier, order_history, amount} = req.body
        console.log(req.body)
        const data = await model.add(invoice, cashier, order_history, amount)
        return res.send('Data Ditambahkan')   
    } catch (error) {
        return res.send(req.body)
    }
},

history.Edit = async (req, res) =>{ 
    try {
        
        const {iid_history, invoice, cashier, order_history, amount} = req.body
        console.log(req.body)
        const data = await model.edit(id_history, invoice, cashier, order_history, amount)
        return res.send(data.rows)  
    } catch (error) {
        return res.send(error)
    }
}

history.Delete = async ( req, res ) => {
    try {
        const {id} = req.body
        console.log(req.body)
        const data = model.delete(id)
        return res.send(data.rows)   
    } catch (error) {
        return res.send(req.body)
    }
},
module.exports = history 