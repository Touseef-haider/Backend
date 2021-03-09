const mongoose = require('mongoose');
// const Schema  = mongoose.Schema();

const FeeSchema = new mongoose.Schema({
    FeeName:String, 
    Date:Date,
    Pay:Number,
    DepositorName:String,
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student'
    }
})

const fee = mongoose.model('fee',FeeSchema);

module.exports = fee;