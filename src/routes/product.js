const express = require("express")
const controller = require('../controller/product')
const validate = require ('../middleware/validate')
const cache = require ('../middleware/cache')
const upload = require('../middleware/upload')
const routes = express.Router()

routes.get("/", controller.All)
routes.put("/", controller.Edit)
routes.get("/search",controller.search)
routes.post("/",upload.single("image"), controller.Add)
routes.delete("/", controller.Delete)
routes.get("/:id/nama",controller.nama)

module.exports = routes