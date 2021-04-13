const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    file:Buffer,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Audience"
    }
})

const File = mongoose.model('File',fileSchema);

module.exports = File;