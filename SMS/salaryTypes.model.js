const mongoose = require('mongoose');

const salaryTypeSchema = mongoose.Schema({
    salaryTypeId:Number,
    salaryName:String
})

const SalaryType = mongoose.model('SalaryType',salaryTypeSchema);

module.exports = SalaryType;