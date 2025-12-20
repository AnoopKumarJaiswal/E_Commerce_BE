const express = require("express")
const router = express.Router()
const { isLoggedIn } = require("../Middlewares/isLoggedIn")
const { isSeller } = require("../Middlewares/isSellor")
const { createProducts, getProducts, deleteProduct, editProduct } = require("../Controller/ProductCountroller")


router.post("/products",isLoggedIn, isSeller,  createProducts)
router.get("/products/:id", isLoggedIn, isSeller ,  getProducts)
router.delete("/products/delete/:id",isLoggedIn, isSeller, deleteProduct )
router.patch("/products/edit/:id",isLoggedIn, isSeller, editProduct )






module.exports = {
    productRouter : router
}