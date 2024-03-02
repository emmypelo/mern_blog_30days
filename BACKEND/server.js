import express from "express";
import { json } from "express";
import dotenv from "dotenv";
import Post from "./models/Post/Post.js";

import mongoose from "mongoose";

dotenv.config();

// create Express instance in app
const app = express();

const port = process.env.PORT;

app.use(express.json());

app.post("/api/post", async (req, res) => {
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
