const express = require('express');
const User = require('../SchoolManagementSystem/user');
const {RegisterUser,LogInUser, userAuth,userRole} = require('../Auth/auth');
const route = express.Router();

// Register the admin role

route.post('/register-admin', async (req,res)=>{
    await RegisterUser(req.body,'admin',res);
})

// Register the student role 

route.post('/register-student', async (req,res)=>{
    await RegisterUser(req.body,'student',res);
})

// Register the teacher role

route.post('/register-teacher',async (req,res)=>{
    await RegisterUser(req.body,'teacher',res)
})

// Login As a Admin
route.post('/login-admin',async (req,res)=>{
    await LogInUser(req.body,'admin',res);
})

// Login as a student

route.post('/login-student',async (req,res)=>{
    await LogInUser(req.body,'student',res);
})

// Login as a teacher

route.post('/login-teacher',async (req,res)=>{
    await LogInUser(req.body,'teacher',res);
})


//get the registered details

route.get('/get',async (req,res)=>{
    res.json(await User.find({}))
})


// now here i will protectt my routes
route.get('/profile',userAuth,(req,res)=>{
    return res.json("Hello How are You brother "+req.user)
    // console.log(req)

})

// admin-protected
route.get('/admin-protected',userAuth,(req,res)=>{
    // return res.json(req.user)
    console.log(req)
})

module.exports = route;