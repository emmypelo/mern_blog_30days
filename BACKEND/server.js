import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Post from "./models/Post/Post.js";

import mongoose from "mongoose";

dotenv.config();

// create Express instance in app
const app = express();

const port = process.env.PORT;

app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

// ? CRUD
// Create a post
app.post("/api/posts/create", async (req, res) => {
  try {
    const postData = req.body;
    const post = await Post.create(postData);
    res.status(200).json({ message: "post created successfully", post });
    console.log(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
// Fetch all post
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: "posts fetched successffully", posts });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

// fetch a post
app.get("/api/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "post fetched", post });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});
// Update a post
app.put("/api/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const postFound = await Post.findById(postId);
    if (!postFound) {
      res.status(404).json({ message: "Post not found" });
    }
    const postUpdated = await Post.findByIdAndUpdate(
      postId,
      { title: req.body.title, description: req.body.description },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "post updated", postUpdated });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});
// Delete a post
app.delete("/api/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    await Post.findByIdAndDelete(postId);
    res.status(201).json({ message: "Post deleted sucessfully" });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("Connected to MongoDB & listening on port", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
