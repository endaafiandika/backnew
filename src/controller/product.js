const model = require('../model/product')
const redis = require('../config/redis')
const product = {}

product.All = async (req, res) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("produkAll", 50, data_redis)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}

product.Add = async ( req, res ) => {
    try {
        if (req.file === undefined) {
            return res.status(500).json("empty data")
        }

        const datas = {
            nama : req.body.nama,
            harga: req.body.harga,
            stok : req.body.stok,
            images: req.file.path,
        }
        console.log(datas)
        const data = await model.add(datas)
        return res.send(datas)   
    } catch (error) {
        return res.send(req.body)
    }
},

product.Edit = async (req, res) =>{ 
    try {
        
        const {id, nama, harga, stok, images} = req.body
        console.log(req.body)
        const data = await model.edit(id, nama, harga, stok , images)
        return res.send(data.rows)  
    } catch (error) {
        return res.send(error)
    }
}

product.Delete = async ( req, res ) => {
    try {
        const {id} = req.body
        console.log(req.body)
        const data = model.delete(id)
        return res.send(data.rows)   
    } catch (error) {
        return res.send(req.body)
    }
},

product.search = async (req, res) => {
    try {
        const nama = req.query.nama
        const data = await model.Get(nama)
        if(data == ''){
        return res.status(200).json('Data Tidak Ada')
    } else {
        return res.status(200).json(data)
    }
    } catch (error) {
        return res.status(500).json("Error")
        
    }
}

product.nama = async(req, res) => {
    try {
        const data = await model.Nama()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}
module.exports = product  