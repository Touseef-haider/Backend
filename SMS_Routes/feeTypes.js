const express = require('express');
const route = express.Router();
const FeeTypes = require('../SMS/feeTypes.model');


route.post('/', async(req,res)=>{
   let { feeTypeId , feeName } = req.body;
   let feeType = new FeeTypes({
        feeTypeId,
        feeName
   })

   await feeType.save()

   res.json("fee type added")
})

route.get('/',async (req,res)=>{
    let students = await FeeTypes.find({}).catch(err=>res.json(err));
    res.json(students);
})

route.delete('/:id',async (req,res)=>{
    await FeeTypes.deleteOne({_id:req.params.id}).catch(err=>res.json(err));
    res.json("deleted");
})


module.exports = route