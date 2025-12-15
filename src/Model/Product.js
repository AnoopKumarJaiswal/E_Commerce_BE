const mongoose = require("mongoose")
const validator = require("validator")


const productSchema  = new mongoose.Schema({
    name : {
        type : String,
       minlength : 2,
       maxlength : 80,
       required : true 
    },
    price : {
        type : Number,
        min : 1,
        required : true 
    },
    desc : {
        type : String, 
        minlength : 10,
        maxlength : 250,
        required : true
    },
    quantity : {
        type : Number,
        min : 1, 
        required : true
    },
    image : {
        type : String,
        validate : (val) =>{
           const isImgValid = validator.isURL(val)
           if(!isImgValid)
           {
            throw new Error("Image Should be in URL Form")
           }
        },
        required : true
    },
    category : {
        type : String,
        enum : {
            values : ["electronics", "grocery", "fashion"],
            message : 'enum validator failed for `{PATH}` with value `{VALUE}`'
        },
        required : true
    }
})



const Product = mongoose.model("product", productSchema)

module.exports = {
    Product 
}












