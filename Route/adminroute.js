const express = require('express');
const student = require('../SchoolManagementSystem/student');
const fee = require('../SchoolManagementSystem/fee');
const teacher = require('../SchoolManagementSystem/teacher');
const salary = require('../SchoolManagementSystem/salary');
const AdminRoute = express.Router();
const {verify} = require('../Auth/auth')

AdminRoute.get('/getStudents',verify,(req,res)=>{
    student.find({}).populate('payments').sort({ClassOfTheStudent:1}).then(result=>{
        res.json(result)
    }).catch(err=>{

        res.json(err)
    })
})
AdminRoute.post('/paySalary/:id',async (req,res)=>{
    const tchr = await teacher.findById({_id:req.params.id});
    const srly = new salary(req.body);
    tchr.pay.push(srly);
    srly.teacher = tchr;
    await tchr.save();
    await srly.save((err,result)=>{
        if (err) {
            res.json(err)
        } else {
            res.json("salary Paid")
        }
    })
})

AdminRoute.post('/payFee/:id',async (req,res)=>{
    const std = await student.findById({_id:req.params.id});
    const newFee = new fee(req.body)
    newFee.student = std;
    await newFee.save();
    std.payments.push(newFee);
    await std.save((err,result)=>{
        if (err) {
            res.json(err)
        } else {
            res.json("payment collected")
        }
    });
})

AdminRoute.post('/admitStudent',(req,res)=>{
    let newStudent = new student({
        StudentName:req.body.StudentName,
        StudentFatherName:req.body.StudentFatherName,
        ClassOfTheStudent:req.body.ClassOfTheStudent,
        Fee:req.body.Fee
    })
    newStudent.save((err,result)=>{
        if (err) {
            res.json(err)
        }else{

            res.json(`Student Admitted`)
        }
    })
})

AdminRoute.delete('/deleteStudent/:id',(req,res)=>{
    student.deleteOne({_id:req.params.id}).then(result=>{
        res.json("student deleted")
    })   
})

AdminRoute.put('/editStudent/:id',(req,res)=>{
    student.updateOne({_id:req.params.id},{
        StudentName:req.body.StudentName,
        StudentFatherName:req.body.StudentFatherName,
        ClassOfTheStudent:req.body.ClassOfTheStudent,
        Fee:req.body.Fee
    },(err,result)=>{
        if (err) {
            res.json(err)
        } else {
            res.json("Student Updated")
        }
    })
})

module.exports = AdminRoute;