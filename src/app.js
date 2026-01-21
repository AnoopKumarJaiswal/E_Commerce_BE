require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose");
const { productRouter } = require("./Routes/Product");
const { userRouter } = require("./Routes/User");
const cp = require("cookie-parser");
const { buyerRuter } = require("./Routes/Buyer");
const cors = require("cors")

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


app.use(cors({
    origin : ["http://localhost:5173"],
    methods : ["GET", "PUT", "PATCH", "DELETE", "POST"],
    credentials : true
}))
app.use(cp())
app.use(express.json())
app.use("/api", userRouter)
app.use("/api", buyerRuter)
app.use("/api",  productRouter)
