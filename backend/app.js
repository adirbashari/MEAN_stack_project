const express = require("express");
const Post = require('./models/post');
const app = express();
const mongoose = require("mongoose")
const mogoDB  = require("./secret-MongoDB-connection-string");

mongoose.connect(mogoDB.connectionString)
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log(connectionString)
  console.log("Connection failed!");
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost=>{
    res.status(201).json({
      message: 'Post added successfully',
      postId:createdPost._id
    });
  });
});


app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents=>{
    res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: documents
  });});

});

app.delete("/api/posts/:id",(req,res,next)=>{
  console.log(req.params.id);
  Post.deleteOne({_id:req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:"Post deleted"});
  });
});


module.exports = app;
