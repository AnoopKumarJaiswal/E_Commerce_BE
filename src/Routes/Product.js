const express = require("express")
const router = express.Router()
const { isLoggedIn } = require("../Middlewares/isLoggedIn")
const { isSeller } = require("../Middlewares/isSellor")
const { isBuyer } = require("../Middlewares/isBuyer")
const { createProducts, getProducts, deleteProduct, editProduct } = require("../Controller/ProductCountroller")


router.post("/products",  createProducts)
router.get("/products/:id",  isBuyer ,isSeller ,getProducts)
router.delete("/products/delete/:id", deleteProduct )
router.patch("/products/edit/:id", editProduct )






module.exports = {
    productRouter : router
}