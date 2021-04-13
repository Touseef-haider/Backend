const express = require('express');
const route = express.Router();
const Audience = require('../SMS/audience.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

route.post('/', async (req,res)=>{
   let { email,password } = req.body; 
    console.log({email,password})
      let user = await Audience.find({email:email}).populate('userTypeId').catch(err=>res.json(err));
      if (user) {
          let p =  await bcrypt.compare(password,user[0].password);
          console.log(p)
        if (!p) {
           res.json("password did not match")
        }else{
           let token = jwt.sign({
            userId:user[0].userId,
            password:p,
            email,
            name:user[0].name
           },'touseef') 
           res.header("authorization",token)
           res.json({token,_id:user[0]._id,userId:user[0].userId,userTypeId:user[0].userTypeId,name:user[0].name})
        }
      }else{
          res.json("email is invalid")
      }
})

route.get('/:id',async (req,res)=>{
    let users = await Audience.find({userId:req.params.id}).populate("userTypeId").catch(err=>res.json(err));
    res.json(users);
})

route.delete('/:id',async (req,res)=>{
    await Audience.deleteOne({_id:req.params.id}).catch(err=>res.json(err));
    res.json("deleted");
})


module.exports = route