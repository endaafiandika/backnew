const express = require("express")
const controller = require('../controller/history')
const validate = require ('../middleware/validate')
const cache = require ('../middleware/cache')
const routes = express.Router()

routes.get("/", cache, controller.All)
routes.put("/", controller.Edit)
routes.post("/", controller.Add)
routes.delete("/", controller.Delete)

module.exports = routes