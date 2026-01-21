const { OrderHistory } = require("../Model/OrderHistory")
const {Product} = require("../Model/Product")

const addProduct = async(req, res) =>{
   try {
         const {id, q} = req.query
         const foundProduct = await Product.findById(id)
         if(!foundProduct)
         {
            throw new Error("Product does not exist")
         }

        

        if(foundProduct.quantity < q)
        {
          throw new Error("You have selecetd out of Stock")
        }

        let isProduct = false

         
        for(let item of req.user.cart)
        {
           if( item.product.toString() == id.toString())
            {
                isProduct = true 
                item.quantity += Number(q)      // query parameter gives in String form
                break
            }
        }
        

        if(!isProduct)
        {
            req.user.cart.push({product: foundProduct._id, quantity : q})
        }
       
       foundProduct.quantity -= q
       await foundProduct.save()
       const newCart = await req.user.save()
       await newCart.populate("cart.product")
       
         res.status(200).json({Success : true ,   cart : req.user.cart})
   } catch (error) {
     res.status(400).json({error : error.message})
   }
}


const removeProduct = async(req, res) =>{
  try {
      const {id} = req.params
      const foundProductInCart = req.user.cart.find((item) => item.product.toString() == id.toString())
      if(!foundProductInCart)
      {
        throw new Error("Product not added in your cart/ Please try with  another product")
      }

      const filterArr = req.user.cart.filter(item => item.product.toString() != id)
      req.user.cart =  filterArr
      const updatedCart = await req.user.save()
      await updatedCart.populate("cart.product")
      const {quantity} = await Product.findById(id)
      await Product.findByIdAndUpdate(id, {quantity : quantity + foundProductInCart.quantity},{new : true})
      res.status(200).json({Success : true, cart : filterArr})
  } catch (error) {
    res.status(400).json({error : error.message})
  }
}



const removeAllProduct = async(req, res) =>{
    req.user.cart = []
    req.user.save()
    res.status(200).json({Success : true, msg : "OK"})
}


const orderHistory = async(req, res) => {
    try {
         await req.user.populate("cart.product")
         let cart =  req.user.cart
         let totalPrice = 0
         let totalCount = 0
         if(cart.length <= 0)
         {
            throw new Error("Please add product in your cart first")
         }
         for(let item of cart)
         {
           totalPrice += item.product.price * item.quantity
           totalCount += item.quantity
         }

         const OrderInfo = await OrderHistory.create({user : req.user._id , product : cart, totalPrice , quantity : totalCount })
        // const populatedOrder = await OrderHistory.find(OrderInfo._id).populate("product.product")
        req.user.cart = []
        await req.user.save()
         

        res.status(201).json({Success : true, data : "OrderPlaced" })
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}


const viewHistory = async(req,res) =>{
  try {
      const loginUser = await OrderHistory.find({
        user :  req.user._id
      }).select("product totalPrice createdAt").populate({
        path : "product.product",
        select : "name price image"
      }).sort({createdAt : -1})
      if(!loginUser) 
      {
        throw new Error("No Ordered Yet")
      }

      if(loginUser.length == 0)
      {
        res.status(404).json({Success : true , data : "No Order History"})
      }
      res.status(200).json({Success : true, data : loginUser})
  } catch (error) {
    res.status(400).json({error : error.message})
  }
}


module.exports = {
    addProduct,
    removeProduct,
    removeAllProduct,
    orderHistory,
    viewHistory
}