const express = require('express');
const teacher = require('../SchoolManagementSystem/teacher');
const teacherRoute = express.Router();



teacherRoute.post('/newteacher',(req,res)=>{
    const NewTeacher = new teacher({
        TeacherName:req.body.TeacherName,
        Salary:req.body.Salary,
        Phone:req.body.Phone,
        Qualification:req.body.Qualification
    })
    NewTeacher.save((err,result)=>{
        if (err) {
            res.json(err)
        } else {
            res.json(NewTeacher)
        }
    })
})

teacherRoute.get('/getTeachers',(req,res)=>{
    teacher.find({}).populate('pay').then((result)=>{
        if (!result) {
            res.json("Not found")
        } else {
            res.json(result)
        }
    })
})

teacherRoute.delete('/deleteTeacher/:id',(req,res)=>{
    teacher.deleteOne({_id:req.params.id}).then((result)=>{
        res.json()
    })
})
teacherRoute.put('/updateTeacher/:id',(req,res)=>{
    teacher.updateOne({_id:req.params.id},{
        TeacherName:req.body.TeacherName,
        Salary:req.body.Salary,
        Phone:req.body.Phone,
        Qualification:req.body.Qualification
    }).then(result=>res.json("Teacher Updated"))
})
module.exports = teacherRoute;