const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();
const Audience = require('../SMS/audience.model');
const UserType = require('../SMS/userTypes.model');
const bcrypt = require('bcryptjs')

route.post('/:id', async(req,res)=>{
   let { title,name,email,password,userId } = req.body; 
   let userType =await UserType.findById({_id:req.params.id})
   let hp = await bcrypt.hash(password,12);
   
   let audience = new Audience({
       userId,  
       name,
       email,
       password:hp,
    });
   audience.userTypeId = userType;
   await audience.save();
   res.json("user added")
})

route.get('/',async (req,res)=>{
    let users = await Audience.find({}).populate("userTypeId").catch(err=>res.json(err));
    res.json(users);
})

route.delete('/:id',async (req,res)=>{
    await Audience.deleteOne({_id:req.params.id}).catch(err=>res.json(err));
    res.json("deleted");
})


module.exports = route