const express  = require("express")
const { addProduct } = require("../Controller/BuyerController")
const { isBuyer } = require("../Middlewares/isBuyer")
const { isLoggedIn } = require("../Middlewares/isLoggedIn")
const router = express.Router()


router.patch("/addproduct", isLoggedIn, isBuyer , addProduct )




module.exports = {
    buyerRuter : router
}