const express = require("express")
const router = express.Router()
const { userSignup, userSignin, userSignout, userData } = require("../Controller/UserController")
const { isLoggedIn } = require("../Middlewares/isLoggedIn")



router.post("/signup", userSignup )
router.post("/signin" , userSignin )
router.post("/signout", userSignout)
router.get("/get-user-data" , isLoggedIn, userData)


module.exports = {
    userRouter : router
}