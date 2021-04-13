const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    studentId:Number,
    name:String,
    classOfStudent:Number,
    fatherName:String,
    address:String,
    contact:Number,
    fee:Number,
    admissionDate:Date  
})

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;