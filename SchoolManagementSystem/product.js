const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    pName:String,
    qty:Number
})

const Product = mongoose.model('Product',ProductSchema)

module.exports = Product;