const express = require('express');
const route = express.Router();
const SalaryType = require('../SMS/salaryTypes.model');
const Teacher = require('../SMS/teacher.model');
const Salary = require('../SMS/salary.model');

route.post('/:salarytypeid/:teacherId', async(req,res)=>{
   let { salaryId , amount } = req.body;
   
   let salaryType = await SalaryType.findById({_id:req.params.salarytypeid}).catch(err=>alert(err));
   let teacher = await Teacher.findById({_id:req.params.teacherId}).catch(err=>alert(err));

   let newSalary = new Salary({
        salaryId,
        amount,
        payDate:Date.now()
   })

   newSalary.salaryTypeId = salaryType;
   newSalary.teacherId = teacher;

   await newSalary.save();

   res.json("salary payed")
})

route.get('/',async (req,res)=>{
    let fee = await Salary.find({}).populate(['salaryTypeId','teacherId']).catch(err=>res.json(err));
    res.json(fee);
})

route.get('/:teacherId',async (req,res)=>{
    let teacher = await Teacher.findById({_id:req.params.teacherId}).catch(err=>res.json(err))
    let salary = await Salary.find({ salaryTypeId : teacher._id }).populate(['salaryTypeId','teacherId']).catch(err=>res.json(err));
    res.json(salary);
})


route.get('/getTeacherSalary/:teacherId',async (req,res)=>{
    let teacher = await Teacher.findById({_id:req.params.teacherId}).catch(err=>res.json(err))
    let salary = await Salary.find({ teacherId : teacher._id }).populate(['salaryTypeId','teacherId']).catch(err=>res.json(err));
    res.json(salary);
})




route.delete('/:id',async (req,res)=>{
    await Salary.deleteOne({_id:req.params.id}).catch(err=>res.json(err));
    res.json("deleted");
})


module.exports = route