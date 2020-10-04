const express = require("express")
const product = require('./routes/product')
const category = require('./routes/category')
const history = require('./routes/history')
const users = require('./routes/users')
const auth = require ('./routes/auth')
const routes = express.Router()

routes.use("/produk", product)
routes.use("/kategori", category)
routes.use("/history", history)
routes.use("/user", users)
routes.use("/auth", auth)

module.exports = routes