const {Product} = require("../Model/Product")

const createProducts = async(req, res) =>{
    try {
          const {name , price, desc, quantity, image , category} = req.body
          if(!name || name.length < 2 || name.length > 80)
          {
            throw new Error("Please Provide Valid Product Name")
          }
          if(!price || price < 1)
          {
            throw new Error("Please Provide Product price")
          }
          if(!desc || desc.length  < 10 ||  desc.length > 250)
          {
            throw new Error("Please Provide valid Product  desc")
          }
          if(!quantity || quantity < 1)
          {
            throw new Error("Please Provide Product quantity")
          }
          if(!image)
          {
            throw new Error("Please Provide Product Image")
          }
          if(!category )
          {
            throw new Error("Please Provide Product category")
          }

          const allowCategroies = ["fashion" , "grocery", "electronics"]
          if(!allowCategroies.includes(category))
          {
            throw new Error("Category should be electronics/grocery/fashion")
          }

         const createdProduct =  await Product.create({name , price, desc, quantity, image , category})
         res.status(201).json({Success : true , data : createdProduct})

    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

const getProducts =  async(req, res) =>{
    try {
           const {id} = req.params
           const foundProduct = await Product.findById(id)
          if(!foundProduct)
            {
              throw new Error("Product not Exist")
            }           

           res.status(200).json({Success : true , data : foundProduct})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

const deleteProduct = async(req,res) =>{
   try {
       const {id} = req.params
       const foundProduct = await Product.findById(id)
       if(!foundProduct)
       {
        throw new Error("Product does not exist")
       }

       const updatedProducts = await Product.findByIdAndDelete(id)
       res.status(200).json({Success : true , data : updatedProducts})
   } catch (error) {
    res.status(400).json({error : error.message})
   }
}

const editProduct = async(req , res) => {
  try {
         const {id} = req.params
         const {name , price, desc, quantity, image , category} = req.body
         if(!id)
         {
          throw new Error("Product Does not exist")
         }


         if(name?.length < 2 || name?.length > 80 )
         {
          throw new Error("Product Name should be greaterthan 2 and less than 80")
         }


         if(price < 1 )
         {
          throw new Error("Price Should be greate than 1 rupees")
         }

         if(desc?.length  < 10 ||  desc?.length > 250)
         {
          throw new Error("Desc should be greaterthan 10 and less than 250")
         }
         
         if(quantity < 1)
         {
          throw new Error("Quantity Should be greate than 1 rupees")
         }
        if(category)
          {
            const allowCategroies = ["fashion" , "grocery", "electronics"]
            if(!allowCategroies.includes(category))
            {
              throw new Error("Category should be electronics/grocery/fashion")
            }
        }

         const updatedProducts = await Product.findByIdAndUpdate(id ,{name , price, desc, quantity, image , category}, {new : true})
         res.status(200).json({Success : true , data : updatedProducts})
  } catch (error) {
      res.status(400).json({error : error.message})
  }
}




module.exports = {
    createProducts,
    getProducts,
    deleteProduct,
    editProduct
}