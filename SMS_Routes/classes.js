const express = require('express');
const { verify } = require('../Auth/auth');
const route = express.Router();
const Classes = require('../SMS/class.model');

route.post('/',verify,async(req,res)=>{
   let { classId,classTitle,feeOfClass} = req.body; 

   let newClasses = new Classes({
       classId,
       classTitle,
       feeOfClass,      
   })

   await newClasses.save(err=>{
       if (err) {
           res.json(err)
       }
   })

   res.json("class added")

})

route.get('/',verify,async (req,res)=>{
    let classes = await Classes.find({}).catch(err=>res.json(err));
    res.json(classes);
})

route.delete('/:id',async(req,res)=>{
    await Classes.deleteOne({_id:req.params.id}).then( result => res.json('deleted')).catch(err=>res.json(err))
})

module.exports = route;