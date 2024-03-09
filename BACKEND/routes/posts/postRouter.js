import { Router } from "express";
import multer from "multer";
import postController from "../../controller/posts/postController.js";
import storage from "../../utilities/fileupload.js";

const upload = multer({ storage });
const postRouter = Router();

postRouter
  .post(
    "/posts/create",
    upload.single("image"),
    postController.createPost
  )
  .get("/posts", postController.fetchAllPosts)
  .get("/posts/:postId", postController.fetchOnePost)
  .put("/posts/:postId", postController.updatePost)
  .delete("/posts/:postId", postController.deletePost);

export default postRouter;
