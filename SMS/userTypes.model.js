const mongoose = require('mongoose')

const userTypeSchema = mongoose.Schema({
    userTypeId:Number,
    title:String
})

const UserType = mongoose.model('UserType',userTypeSchema)

module.exports = UserType;