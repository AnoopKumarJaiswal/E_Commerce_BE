const express = require("express")
const router = express.Router()
const {Product} = require("../Model/Product")


router.post("/products", async(req, res) =>{
    try {
          const {name , price, desc, quantity, image , catagory} = req.body
          if(!name)
          {
            throw new Error("Please Provide Product Name")
          }
          if(!price)
          {
            throw new Error("Please Provide Product price")
          }
          if(!desc)
          {
            throw new Error("Please Provide Product desc")
          }
          if(!quantity)
          {
            throw new Error("Please Provide Product quantity")
          }
          if(!image)
          {
            throw new Error("Please Provide Product Image")
          }
          if(!catagory)
          {
            throw new Error("Please Provide Product catagory")
          }

         const createdProduct =  await Product.create({name , price, desc, quantity, image , catagory})
         res.status(200).json({Success : "True", data : createdProduct})

    } catch (error) {
        res.status(400).json({error : error.message})
    }
})



router.get("/products/:id" , async(req, res) =>{
    try {
           const {id} = req.params
           if(!id)
           {
            throw new Error("Please provide Product Id")
           }
           const foundProduct = await Product.findById(id)
           console.log(foundProduct);
           

           res.status(200).json({Success : true , data : foundProduct})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})



router.delete("/products/:id", async(req,res) =>{
   try {
       const {id} = req.params
       if(!id)
       {
        throw new Error("Please Provide a product Id")
       } 

       const updatedProducts = await Product.findByIdAndDelete(id)
       res.status(200).json({Success : true , data : updatedProducts})
   } catch (error) {
    res.status(400).json({error : error.message})
   }
})







module.exports = {
    productRouter : router
}