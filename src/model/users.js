const database = require('../../db')
const users = {}

users.GetAll = () => {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM users')
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

users.add = (data) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO users (username, password, status) VALUES ('${data.username}','${data.password}', '${data.status}')`)
        .then((res) => {
            resolve(res)
        }) 
        .catch (err => {
            reject("gagal")
        })
    })
    
},

users.get= (username) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM users WHERE username = '${username}'`)
        .then(res => {
            resolve(res.rows)
        }) 
        .catch(err => {
            reject(err)

        })
    })
},

users.setToken = (user, token) => {
    return new Promise ((resolve, reject) => {
        database.query(`UPDATE users SET token = '${token}' WHERE username = '${username}'`)
        .then(res => {
            resolve('token set in user : ${user}')
        }) 
        .catch(err => {
            reject(err)

        })
    })
},

module.exports = users