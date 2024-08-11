const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const Post = require("../models/post");


async function handleLoginUser(req,res) {
    const email = req.body.email;
    const result = await User.findOne({email});
    req.session.userId = result.id;
    console.log(req.session.userId);
    if(result) {
        console.log(result);
        const p = result.password == req.body.password;
        if(p) {
            return res.status(200).send("Login successful");
        }
        else {
            return res.status(400).send("Incorrect password");
        }
    }
    else {
        return res.status(400).send("User does not exist");
    }
}


async function handleRegisterUser(req,res) {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        console.log(email);
        console.log(password);
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const result = await User.findOne({email});
        if(result != null) {
            return res.status(400).send("User already exists");
        }
        // const p = await bcrypt.hash(password);
        const newUser = new User({
        name,
        email,
        password,
        });
        newUser.save();
        // const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', {
        // expiresIn: '1h',
        // });

        // Return success response with token
        res.status(201).json({ 
        message: 'User registered successfully', 
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        } 
        });
    }
    catch(err) {
        console.log(err);
    }
}

async function handleAddPost(req,res) {
    const createdBy = req.session.userId;
    console.log(createdBy);
    const result = await User.findOne({createdBy});
    if(result){
        const { title, description } = req.body;
        const newPost = await Post.create({
            title: title,
            description: description,
            createdBy: createdBy
        });
        newPost.save();
        return res.status(201).json({
            message: 'Post created successfully',
        });
    }
    else {
        return res.status(401).send("Unauthorized");
    }
}

module.exports = {
    handleLoginUser,
    handleRegisterUser,
    handleAddPost
};