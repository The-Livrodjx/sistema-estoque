const express = require("express")
const routes = express.Router()

const homeController = require("./controllers/HomeController")
const productController = require("./controllers/ProductController")
const adminController = require("./controllers/AdminController")
const AdminAuth = require("./middleware/AdminAuth")

routes.get("/", AdminAuth ,homeController.index)
routes.get("/getProducts", AdminAuth ,productController.showAll)
routes.get("/getProduct/:id", productController.findOne)
routes.post("/createProduct", productController.create)
routes.post("/searchProduct", productController.searchProduct)
routes.post("/sellAnotherItem", productController.sellAnotherItem)
routes.post("/createAdmin", adminController.createAdmin)
routes.post("/authenticate", adminController.authenticate)
routes.post("/newMonth", productController.newMonth)
routes.get("/getManagements", productController.getManagements)
routes.delete("/deleteProduct/:id", productController.deleteProduct)
routes.put("/updateProduct", productController.updateProduct)


routes.get("/returnId", productController.returnId)
module.exports = routes