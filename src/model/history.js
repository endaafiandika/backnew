const database = require('../../db')
const history = {}

history.GetAll = () => {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM history')
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

history.add = (data) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO history (invoice, cashier, order_history, amount) VALUES ('${data.invoice}','${data.cashier}','${data.order_history}','${data.amount}')`)
        .then(res => {
            resolve(res)
        }) 
        .catch (err => {
            reject("gagal")
        })
    })
    
},

history.edit = (id_history, invoice, cashier, order_history, amount) => {
    database.query(`UPDATE history SET invoice='${invoice}', type='${cashier}', order_history='${order_history}', amount='${amount}' WHERE id_history=${id_history} `)
    .then(res => {
        return res.rows
    })
    .catch(err => {
        console.log(err)
    })
}

history.delete = (id) => {
    database.query(`DELETE FROM history WHERE id_history=${id} `)
    .then(res => {
        return res.rows
    })
    .catch(err => {
        console.log(err)
    })
}
module.exports = history