const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
    Amount:Number,
    Month:Date,
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teacher'
    }
})

const salary = mongoose.model('salary',SalarySchema);

module.exports = salary;