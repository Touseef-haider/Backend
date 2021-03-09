const express = require('express');
const Proute = express.Router();
const Post = require('../SchoolManagementSystem/post');
const Comment = require('../SchoolManagementSystem/comment');

// add post

Proute.post('/posts',async (req,res)=>{
    const newPost = new Post(req.body)
    await newPost.save((err,data)=>{
        if (err) {
            res.json(err)
        } else {
            res.json("post added")
        }
    });
})

// get all posts

Proute.get('/getPosts',(req,res)=>{
   Post.find({}).populate('comment').then(result=>res.json(result)).catch(err=>res.json(err))
})

// delete the particular post

Proute.delete('/deletePost/:id',async (req,res)=>{
    await Post.deleteOne({_id:req.params.id}).then(result=>res.json("Post deleted"))
})

// adding comment on the particular post

Proute.post('/post/:id',async (req,res)=>{
    const newPost = await Post.findById({_id:req.params.id});
    console.log(newPost)
    const newComment = new Comment(req.body);
    newPost.comment.push(newComment);
    newComment.postedBy = newPost;
    await newPost.save();
    await newComment.save().then(result=>res.json("Comment Added"));
})

// delete particular on a particular post

Proute.delete('/deleteComment/:id/:commentId',async (req,res)=>{
    const path = req.path;
    const ids = path.split('/')
    const post = await Post.findById({_id:ids[2]})
    post.comment.filter(cmt=>cmt._id!=ids[3]);
    post.save()
    Comment.deleteOne({_id:ids[3]}).then(result=>res.json("comment Deleted"));
})

module.exports =Proute;

