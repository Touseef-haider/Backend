const express = require('express');
const route = express.Router();
const SalaryType = require('../SMS/salaryTypes.model');


route.post('/', async(req,res)=>{
   let { salaryTypeId , salaryName } = req.body;
   let salaryType = new SalaryType({
        salaryTypeId,
        salaryName
   })

   await salaryType.save()

   res.json("salary type added")
})

route.get('/',async (req,res)=>{
    let salaryType = await SalaryType.find({}).catch(err=>res.json(err));
    res.json(salaryType);
})

route.delete('/:id',async (req,res)=>{
    await SalaryType.deleteOne({_id:req.params.id}).catch(err=>res.json(err));
    res.json("deleted");
})


module.exports = route