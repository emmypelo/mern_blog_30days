import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "comment name is required"],
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "author is required"],
    },
    post: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "post is required"],
      },
    ],
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export default Comment;
