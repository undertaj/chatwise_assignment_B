const express = require("express");

const { connectToMongoDB } = require("./connect");
const userRoute = require("./routes/user");
const session = require("express-session");
const app = express();


app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use('/user', userRoute);



app.listen(3000, async () => {
    await connectToMongoDB("mongodb://localhost:27017/social_media");
    console.log("Server started on http://localhost:3000");
    }
);