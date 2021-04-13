const mongoose = require('mongoose');

const salarySchema = mongoose.Schema({
    salaryId:Number,
    salaryTypeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SalaryType'
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    },
    payDate:Date,
    amount:Number    
})

const Salary = mongoose.model('Salary',salarySchema);

module.exports = Salary;