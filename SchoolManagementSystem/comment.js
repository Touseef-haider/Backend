const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment:String,
    postedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
    }
})


const Comment = mongoose.model('comment',commentSchema);

module.exports = Comment;