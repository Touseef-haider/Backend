const mongoose = require('mongoose');
const fee = require('./fee');
const attendance = require('./attendance');


const StudentSchema = new mongoose.Schema({
    StudentName:String,
    StudentFatherName:String,
    ClassOfTheStudent:String,
    Fee:Number,
    payments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'fee'
        }
    ]
    // StudentImage pending...
})

const student = mongoose.model('student',StudentSchema);

module.exports = student;