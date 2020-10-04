require ('dotenv/config')
const morgan = require('morgan')
const express = require('express');
const app = express();
const pool = require("./db");
const cors = require('cors');
const bodyParser = require('body-parser');
const redis = require('./src/config/redis')
const routes = require('./src/main')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(routes)
app.use("/public", express.static("public"))
app.use(morgan)

app.get("/produk/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const todo = await pool.query("SELECT * FROM produk WHERE id = $1",[id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// app.get("/produk/find/:nama", async (req,res) => {
//     const names = req.params.nama;

//     try {
//         const todo = await pool.query(`SELECT * FROM produk WHERE nama LIKE '%${names}%' ORDER BY id `);
//         res.json(todo.rows[0]);
        
//     } catch (err) {
//         console.error(err.message);
//     }
// });

redis
    .redisCheck()
    .then (res => {
        console.log(res)
    })
    .catch (err => {
        console.log(err)
    })

app.listen(3000, () => {
    console.log('server listening in port 3000');
});