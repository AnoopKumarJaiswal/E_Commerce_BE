const mongoose = require("mongoose")


const orderHistorySchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user"
    },
    totalPrice : {
        type : Number,
        min : 1,
        required : true
    },
    product : [
        {
            product : {
                    type : mongoose.Schema.Types.ObjectId,
                    required : true,
                    ref : "product"
            },
            quantity : {
                type : Number,
                required: true
            }
        }
    ],

},{timestamps : true})


const OrderHistory = mongoose.model("orderHistory" , orderHistorySchema)

module.exports = {
    OrderHistory
}