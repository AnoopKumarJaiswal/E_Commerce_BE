const express = require("express")
const router = express.Router()
const { isLoggedIn } = require("../Middlewares/isLoggedIn")
const { isSeller } = require("../Middlewares/isSellor")
const { createProducts, getProducts, deleteProduct, editProduct, getAllProduct, filterProduct, getProductAdminWise, getProductsByQuery, getProductsById } = require("../Controller/ProductCountroller")


router.post("/products",isLoggedIn, isSeller,  createProducts)
router.get("/products",isLoggedIn, getAllProduct)   
router.get("/products/search", isLoggedIn ,  getProductsByQuery)
router.get("/products/search/:id",isLoggedIn, isSeller,getProductsById)
router.get("/products/filter/:category",isLoggedIn, filterProduct)
router.get("/products/adminwise" , isLoggedIn , isSeller, getProductAdminWise)
router.delete("/product/delete/:id",isLoggedIn, isSeller, deleteProduct )
router.patch("/products/edit/:id",isLoggedIn, isSeller, editProduct )





module.exports = {
    productRouter : router
}