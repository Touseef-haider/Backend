const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    teacherId:Number,
    name:String,
    address:String,
    contact:Number,
    salary:Number,
    joiningDate:Date,
    qualification:String,
    experience:String,
    classTeacherOf:String  
})

const Teacher = mongoose.model('Teacher',teacherSchema);

module.exports = Teacher;