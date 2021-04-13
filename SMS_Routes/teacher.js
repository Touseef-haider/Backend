const express = require('express');
const route = express.Router();
const Teacher = require('../SMS/teacher.model');
const Classes = require('../SMS/class.model');

route.post('/', async(req,res)=>{
   let { teacherId,name,classTeacherOf,qualification,salary,experience,address,contact} = req.body; 
   let classes = await Classes.findById({_id:classTeacherOf}).catch(err=>{
       res.json(err)
   })


   var t = classes.classTitle
   
   let newTeacher = new Teacher({
       teacherId,
       name,
       address,
       contact,
       salary,
       qualification,
       experience,
       joiningDate:Date.now(),
       classTeacherOf:t
   })
   await newTeacher.save()
   res.json("teacher hired")

})

route.get('/',async (req,res)=>{
    let teachers = await Teacher.find({}).catch(err=>res.json(err));
    res.json(teachers);
})

route.get('/:name',async (req,res)=>{
    let teachers = await Teacher.find({name:req.params.name}).catch(err=>res.json(err));
    res.json(teachers);
})


route.delete('/:id',async (req,res)=>{
    await Teacher.deleteOne({_id:req.params.id}).catch(err=>res.json(err));
    res.json("deleted");
})


module.exports = route