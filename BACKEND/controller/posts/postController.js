import asyncHandler from "express-async-handler";
import Post from "../../models/Post/Post.js";

// const handler = asyncHandler;

const postController = {
  createPost: asyncHandler(async (req, res) => {
    console.log(req.file);

    const { description, title } = req.body;

    const postCreated = await Post.create({
      description,
      title,
      image: req?.file,
    });

    res.json(postCreated);
  }),

  fetchAllPosts: asyncHandler(async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }),

  fetchOnePost: asyncHandler(async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);

      if (!post) {
        res.status(404).json({ message: "Post not found" });
      } else {
        res.status(200).json({ message: "Post fetched", post });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }),

  updatePost: asyncHandler(async (req, res) => {
    try {
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
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }),

  deletePost: asyncHandler(async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);

      if (!post) {
        res.status(404).json({ message: "Post not found" });
      } else {
        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }),
};

export default postController;
