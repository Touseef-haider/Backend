const mongoose = require('mongoose')
let id = 1;

const userSchema = mongoose.Schema({
    userId:Number,
    userTypeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserType'
    },
    name:String,
    email:String,
    password:String
})

const Audience = mongoose.model('Audience',userSchema)

module.exports = Audience;