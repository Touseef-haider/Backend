const express = require('express');
const route = express.Router();
const Student = require('../SMS/student.model');
const Classes = require('../SMS/class.model');

route.post('/', async(req,res)=>{
   let { studentId,name,classOfStudent,fee,fatherName,address,contact} = req.body; 
   let classes = await Classes.find({classOfStudent}).catch(err=>{
       res.json(err)
   })

   let newStudent = new Student({
       studentId,
       name,
       fatherName,
       address,
       contact,
       classOfStudent,
       fee,
       admissionDate:Date.now()
   })
   await newStudent.save(err=>{
       if (err) {
           res.json(err)
       }
   })

   res.json("student admitted")


})

route.get('/',async (req,res)=>{
    let students = await Student.find({}).catch(err=>res.json(err));
    res.json(students);
})

route.get('/:class',async (req,res)=>{
    let students = await Student.find({classOfStudent:req.params.class}).catch(err=>res.json(err));
    res.json(students);
})


route.delete('/:id',async (req,res)=>{
    await Student.deleteOne({_id:req.params.id}).catch(err=>res.json(err));
    res.json("deleted");
})


module.exports = route