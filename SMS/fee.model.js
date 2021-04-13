const mongoose = require('mongoose');

const feeSchema = mongoose.Schema({
    feeId:Number,
    feeTypeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'FeeTypes'
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    payDate:Date,
    amount:Number    
})

const Fee = mongoose.model('Fee',feeSchema);

module.exports = Fee;