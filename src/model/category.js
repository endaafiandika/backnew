const database = require('../../db')
const category = {}

category.GetAll = () => {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM kategori')
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

category.add = (data) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO kategori (name_produk, type) VALUES ('${data.name_produk}','${data.type}')`)
        .then(res => {
            resolve(res)
        }) 
        .catch (err => {
            reject("gagal")
        })
    })
    
},

category.edit = (id_kategori, name_produk, type) => {
    database.query(`UPDATE kategori SET name_produk='${name_produk}', type='${type}' WHERE id_kategori=${id_kategori} `)
    .then(res => {
        return res.rows
    })
    .catch(err => {
        console.log(err)
    })
}

category.delete = (id) => {
    database.query(`DELETE FROM kategori WHERE id_kategori=${id} `)
    .then(res => {
        return res.rows
    })
    .catch(err => {
        console.log(err)
    })
}
module.exports = category