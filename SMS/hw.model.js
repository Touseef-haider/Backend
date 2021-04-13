const mongoose = require('mongoose');

const HomeWorkSchema = mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    },
    forClass:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Classes'
    },
    homeWork:{
        type:Buffer
    }
})

const HomeWork = mongoose.model('homeWork',HomeWorkSchema)

module.exports = HomeWork;