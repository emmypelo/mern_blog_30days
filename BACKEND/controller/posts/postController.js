import asyncHandler from "express-async-handler";
import Post from "../../models/Post/Post.js";

const handler = asyncHandler;

const postController = {
  createPost: handler(async (req, res) => {
    const postData = req.body;
    const post = await Post.create(postData);
    res.status(201).json({ message: "Post created successfully", post });
    console.log(post);
  }),

  fetchAllPosts: handler(async (req, res) => {
    const posts = await Post.find();
    res.status(200).json({ message: "Posts fetched successfully", posts });
  }),

  fetchOnePost: handler(async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json({ message: "Post fetched", post });
    }
  }),

  updatePost: handler(async (req, res) => {
    const postId = req.params.postId;
    const postFound = await Post.findById(postId);

    if (!postFound) {
      res.status(404).json({ message: "Post not found" });
    } else {
      const postUpdated = await Post.findByIdAndUpdate(
        postId,
        { title: req.body.title, description: req.body.description },
        { new: true }
      );

      res.status(200).json({ message: "Post updated", postUpdated });
    }
  }),

  deletePost: handler(async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      await Post.findByIdAndDelete(postId);
      res.status(200).json({ message: "Post deleted successfully" });
    }
  }),
};

export default postController;
