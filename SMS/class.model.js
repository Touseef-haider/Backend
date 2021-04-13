const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    classId:{
        type:Number,
    },
    classTitle:String,
    feeOfClass:Number
})


const Classes = mongoose.model('Classes',classSchema);

module.exports = Classes;