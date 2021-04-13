const express = require('express');
const route = express.Router();
const FeeTypes = require('../SMS/feeTypes.model');
const Student = require('../SMS/student.model');
const Fee = require('../SMS/fee.model');

route.post('/:feetypeid/:stdId', async(req,res)=>{
   let { feeId , amount } = req.body;
   
   let feeType = await FeeTypes.findById({_id:req.params.feetypeid}).catch(err=>alert(err));
   let student = await Student.findById({_id:req.params.stdId}).catch(err=>alert(err));

   let newFee = new Fee({
        feeId,
        amount,
        payDate:Date.now()
   })

   newFee.feeTypeId = feeType;
   newFee.studentId = student;

   await newFee.save().then(err=>console.log(err))

   res.json("fee payed")
})

route.get('/',async (req,res)=>{
    let fee = await Fee.find({}).populate(['feeTypeId','studentId']).catch(err=>res.json(err));
    res.json(fee);
})

route.get('/:stdId',async (req,res)=>{
    let student = await Student.findById({_id:req.params.stdId}).catch(err=>res.json(err))
    let fee = await Fee.find({ studentId : student._id }).populate(['feeTypeId','studentId']).catch(err=>res.json(err));
    // let fee = await Fee.find().catch(err=>res.json(err));
    res.json(fee);
})


route.delete('/:id',async (req,res)=>{
    await Fee.deleteOne({_id:req.params.id}).catch(err=>res.json(err));
    res.json("deleted");
})


module.exports = route