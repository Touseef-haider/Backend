const express = require('express');
const { RegisterUser } = require('../Auth/auth');
const Product = require('../SchoolManagementSystem/product');
const Route = express.Router();
const Purchase = require('../SchoolManagementSystem/purchase');
const User = require('../SchoolManagementSystem/user');

Route.get('/',(req,res)=>{
    Purchase.find({}).populate(['purchase','user'])
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.json(err)
    })
})


Route.post('/:id',async (req,res)=>{
    // find a user then
    let user = await User.findById(req.body.id).catch(err=>console.log(err))
    // find the product
    let product = await Product.findById(req.params.id).catch(err=>console.log(err))
    // then purchase it
    let purchase = new Purchase({
        purchase: [product],
        user:[user]
    });
   
    await purchase.save()
    res.json("purchased")
})

Route.get('/user',async (req,res)=>{
    User.find({}).then(result => res.json(result)).catch(err=>console.log(err))
})


module.exports = Route;