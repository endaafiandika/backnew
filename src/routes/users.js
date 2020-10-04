const express = require("express")
const controller = require('../controller/users')
const validate = require('../middleware/validate')
const routes = express.Router()

routes.get("/", controller.All)
routes.post("/",controller.Add)
routes.get("/search", controller.search)

module.exports = routes