const express = require('express')
const controller = require ('../controller/auth')
const routes = express.Router()

routes.post("/", controller.login)

module.exports = routes