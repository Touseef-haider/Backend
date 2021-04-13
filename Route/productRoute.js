const express = require('express');
const Product = require('../SchoolManagementSystem/product');
const route = express.Router();

route.get('/',async (req,res)=>{
    let p = await await Product.find({}).catch(err=>console.log(err))
    res.json(p)
})

route.post('/',(req,res)=>{
    console.log(req.body)
    let newP = new Product({
        pName:req.body.pName,
        qty:req.body.qty
    })
    newP.save()
    res.status(200).json({
        result:"Product Added",
        data:newP
    })
})

module.exports = route