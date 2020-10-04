const model = require('../model/category')
const redis = require('../config/redis')
const category = {}

category.All = async (req, res) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("produkAll", 50, data_redis)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}

category.Add = async ( req, res ) => {
    try {
        const {name_produk, type} = req.body
        console.log(req.body)
        const data = await model.add(name_produk, type)
        return res.send('Data Ditambahkan')   
    } catch (error) {
        return res.send(req.body)
    }
},

category.Edit = async (req, res) =>{ 
    try {
        
        const {id_kategori, name_produk, type} = req.body
        console.log(req.body)
        const data = await model.edit(id_kategori, name_produk, type)
        return res.send(data.rows)  
    } catch (error) {
        return res.send(error)
    }
}

category.Delete = async ( req, res ) => {
    try {
        const {id} = req.body
        console.log(req.body)
        const data = model.delete(id)
        return res.send(data.rows)   
    } catch (error) {
        return res.send(req.body)
    }
},
module.exports = category 