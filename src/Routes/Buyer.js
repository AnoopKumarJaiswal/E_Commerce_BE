const express  = require("express")
const { addProduct, removeProduct, removeAllProduct,  orderHistory, viewHistory } = require("../Controller/BuyerController")
const { isBuyer } = require("../Middlewares/isBuyer")
const { isLoggedIn } = require("../Middlewares/isLoggedIn")
const router = express.Router()


router.patch("/addproduct", isLoggedIn, isBuyer , addProduct )
router.delete("/removecart/:id", isLoggedIn, isBuyer, removeProduct)
router.delete("/removeallcart", isLoggedIn, isBuyer,removeAllProduct)


router.post("/orderhistory", isLoggedIn, isBuyer, orderHistory)
router.get("/orderhistory/view" , isLoggedIn, isBuyer, viewHistory)




module.exports = {
    buyerRuter : router
}