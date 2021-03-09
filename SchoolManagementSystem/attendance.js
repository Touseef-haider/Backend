const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    Time:Date,
    Year:String,
    Day:String,
    Month:String
})

const attendance = mongoose.model('attendance',AttendanceSchema);

module.exports = attendance;