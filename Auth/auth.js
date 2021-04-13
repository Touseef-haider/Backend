const bcrypt = require('bcryptjs');
const User = require('../SchoolManagementSystem/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Register function
const RegisterUser = async (userDetail,role,res)=>{
    const validUser = await validateUserName(userDetail.UserName);
    if (validUser) {
        return res.json("UserName already exist");
    }
    const validEmail = await validateEmail(userDetail.Email);
    if (validEmail) {
        return res.json("Email has already taken");
    }
    const pwd = await bcrypt.hash(userDetail.Password,12);

    const newUser  = new User({
        ...userDetail,
        Password:pwd,
        role:role
    })
    await newUser.save();
    return res.json("You are registered successfully")
}

// Login function
const LogInUser = async (userDetail,role,res)=>{
    const {UserName,Password,Email} = userDetail;
    const user = await User.findOne({UserName});
    if(!user){
        return res.json("User does not exist with this username")
    }
    if (user.Email != Email ) {
        return res.json("Email is invalid please write the valid email")
    }
    if (user.role !== role) {
        return res.json("You are not allowed i.e unauthorized")
    }
    const matchpwd = await bcrypt.compare(Password,user.Password);
    if (!matchpwd) {
        return res.json("Password did not match the credentials")
    } else {
        let token = jwt.sign({
            User_id:user._id,
            UserName:user.UserName,
            role:user.role,
            Email:user.Email
        },'secretkey')
        res.header('authorization',token)
        let result={
            User_id:user._id,
            UserName:user.UserName,
            Email:user.Email,
            token:`Bearer ${token}`,
            expiresIn:150
        }
        res.json(result)
    }
}

const validateUserName = async (UserName)=>{
    const usertofind = await User.findOne({UserName});
    return usertofind ? true:false
}

// authenticating the user
const userAuth =  passport.authenticate('jwt',{session:false})

// user role middleware

const userRole = roles => async (req,res,next)=>{
    if (roles.includes(req.user.role)) {
       return next();
    }
    else{
        return res.json("Unausthorized")
    }
}

const validateEmail = async (Email)=>{
    const email = await User.findOne({Email});
    return email ? true:false
}
const verify=(req,res,next)=>{
    let token = req.header('authorization')
    // console.log(token)
    if (!token) {
        res.json("Access Denied");
    } else {
        let verified = jwt.verify(token,"touseef");
        if (verified) {
            next()
        } else {
            res.json("Invalid Token")
        }
    }
}
module.exports = {
    RegisterUser,
    LogInUser,
    userAuth,
    userRole,
    verify
};