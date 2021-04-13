const mongoose = require('mongoose');

const feeTypesSchema = mongoose.Schema({
    feeTypeId:Number,
    feeName:String
})

const FeeTypes = mongoose.model('FeeTypes',feeTypesSchema);

module.exports = FeeTypes;