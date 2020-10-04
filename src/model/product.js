const database = require('../../db')
const product = {}

product.GetAll = () => {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM produk')
        .then(res => {
            resolve(res.rows)
            if (res.rows == []){
                console.log('data tidak ada')
            }
        })
        .catch(err => {
            reject(err)
        })
    })
}

product.add = (data) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO produk (nama, harga, stok, images) VALUES ('${data.nama}','${data.harga}', '${data.stok}', '${data.images}')`)
        .then(res => {
            resolve(res)
        }) 
        .catch (err => {
            reject("gagal")
        })
    })
    
},

product.edit = (id, nama, harga, stok, images) => {
    database.query(`UPDATE produk SET nama='${nama}', harga='${harga}', stok='${stok}', images='${images}' WHERE id=${id} `)
    .then(res => {
        return res.rows
    })
    .catch(err => {
        console.log(err)
    })
}

product.delete = (id) => {
    database.query(`DELETE FROM produk WHERE id=${id} `)
    .then(res => {
        return res.rows
    })
    .catch(err => {
        console.log(err)
    })
}

product.Get= (nama) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM produk WHERE nama = '${nama}'`)
        .then(res => {
            resolve(res.rows)
        }) 
        .catch(err => {
            reject(err)

        })
    })
}

product.Nama = () => {
    return new Promise ((resolve, reject) => {
        database.query ('SELECT * FROM produk ORDER BY nama ASC')
        .then(res => {
            resolve(res.rows)
        }) .catch(err => {
            reject(err)
        })
    })
}

module.exports = product