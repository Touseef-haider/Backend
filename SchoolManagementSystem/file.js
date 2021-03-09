const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    file:{
        type:String,
    }
})

const file = mongoose.model('file',fileSchema);

module.exports = file;