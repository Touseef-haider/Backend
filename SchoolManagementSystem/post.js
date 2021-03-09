const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:String,
    body:String,
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ]
})


const Post = mongoose.model('post',postSchema);

module.exports = Post;