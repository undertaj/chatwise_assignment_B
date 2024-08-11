const Post = require("../models/post");
const Comment = require("../models/comment");
const { default: mongoose } = require("mongoose");

async function handleAddComment(req,res) {
    const postid  = req.query.id;
    console.log(postid);
    const post = await Post.findById(postid);
    if(post){
        console.log(req.body.text);
        const comment = await Comment.create({
            comment: req.body.text,
            commentedBy: req.session.userId
        });
        db.posts.update({id: post.id},{$set: {"comments": [...post.comments, comment]}});
        // post.comments.push(comment._id);
        return res.status(201).json({message: "Comment added successfully"});
    }
    else {
        return res.status(404).json({message: "Post not found"});
    }

}

module.exports = {
    handleAddComment
}