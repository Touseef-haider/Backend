const mongoose = require('mongoose');

const PurchaseSchema = mongoose.Schema({
    purchase :[
       { 
           type: mongoose.Schema.Types.ObjectId,
           ref : 'Product'
       }
    ],
    user : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})

const Purchase = mongoose.model('Purchase',PurchaseSchema)
module.exports = Purchase;