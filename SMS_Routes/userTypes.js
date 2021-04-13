const express = require('express');
const UserType = require('../SMS/userTypes.model');
const route = express.Router();

route.post('/',async (req,res)=>{
   let userType = new UserType(req.body);
   await userType.save();
   res.json("userType added")
})

route.get('/',async (req,res)=>{
    let userTypes = await UserType.find({}).catch(err=>res.json(err));
    res.json(userTypes);
})

route.delete('/:id',async (req,res)=>{
    await UserType.deleteOne({_id:req.params.id}).catch(err=>res.json(err));
    res.json("deleted");
})


module.exports = route