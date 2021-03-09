const mongoose = require('mongoose');
const attendance = require('./attendance');
const salary = require('./salary');

const TeacherSchema = new mongoose.Schema({
    TeacherName:String,
    Salary:Number,
    Phone:Number,
    Qualification:String,
    pay:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'salary'
        }
    ]
})

const teacher = mongoose.model('teacher',TeacherSchema);

module.exports = teacher;