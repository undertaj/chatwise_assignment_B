const Post = require("../models/post");
const Comment = require("../models/comment");
const { default: mongoose } = require("mongoose");

async function handleAddComment(req,res) {
    const postid  = req.params.id;
    console.log(postid);
    const post = await Post.findById(postid);
    if(post){
        console.log(req.body.text);
        console.log(req.session.userId);
        const comment = await Comment.create({
            comment: req.body.text,
            commentedBy: req.session.userId
        });
        await Post.findByIdAndUpdate({ _id : postid }, {"comments": [...post.comments, comment]});
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