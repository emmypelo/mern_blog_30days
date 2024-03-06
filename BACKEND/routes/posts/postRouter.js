import { Router } from "express";
import postController from "../../controller/posts/postController.js";

const postRouter = Router();

postRouter
  .post("/posts/create", postController.createPost)
  .get("/posts", postController.fetchAllPosts)
  .get("/posts/:postId", postController.fetchOnePost)
  .put("/posts/:postId", postController.updatePost)
  .delete("/posts/:postId", postController.deletePost);

export default postRouter;
