require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose");
const { productRouter } = require("./Routes/Product");
const { userRouter } = require("./Routes/User");
const cp = require("cookie-parser")


mongoose.connect(process.env.MONGODB_URL)
.then(() =>{
    console.log("DB Connected SuccessFully")
    
    app.listen(process.env.PORT, () =>{
        console.log("Sever Running on :", process.env.PORT );
    })
})
.catch(() =>{
    console.log("DB Connection Failed")
})

app.use(cp())
app.use(express.json())
app.use("/api" , productRouter)
app.use("/api", userRouter)
