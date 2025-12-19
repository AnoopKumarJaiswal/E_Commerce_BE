const express  = require("express")
const { addProduct } = require("../Controller/BuyerController")
const router = express.Router()


router.patch("/addproduct", addProduct )




module.exports = {
    buyerRuter : router
}