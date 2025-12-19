const express = require("express")
const router = express.Router()
const { userSignup, userSignin, userSignout } = require("../Controller/UserController")



router.post("/signup", userSignup )
router.post("/signin" , userSignin )
router.post("/signout", userSignout )


module.exports = {
    userRouter : router
}