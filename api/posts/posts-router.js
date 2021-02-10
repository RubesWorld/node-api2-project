// implement your posts router here

//bring in DB functions from models
const PostModels = require("./posts-model");

//import express
const express = require("express");
//create the router variable grabbing the Router method
const router = express.Router();

//endpoints here
//get requests (three)
router.get("/api/posts", (req, res) => {
  PostModels.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({ message: "" });
    });
});

router.get("/api/posts/:id", (req, res) => {
  PostModels.findById(req.params.id).then((posts) => {
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "Posts not found" });
    }
  });
});

router.get("/api/posts/:id/comments", (req, res) => {
  PostModels.findCommentById(req.params.id)
    .then((comments) => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({
          message: "The post with that specified ID does not exist ",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "The comments information can could not be retrieved",
      });
    });
});

//post requests (one)
router.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please Provide title and contents for the post" });
  } else {
    PostModels.insert(title, contents)
      .then((posts) => {
        res.status(201).json(posts);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

//put requests (one)
router.put("/api/posts/:id", (req, res) => {
  const post = req.body;
  const idVar = req.params.id;
  if (!post.title || !post.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  } else {
    PostModels.update(id, post)
      .then((post) => {
        if (post) {
          res.status(200).json(post);
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "The post information could not be modified" });
      });
  }
});

//delete requests (one)
router.delete("/api/posts/:id",(req,res)=>{
    
})

module.exports = router;
