import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: {
      type: Object,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nextEarningDate: {
      type: Date,
      default: () =>
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1), // Default to the first day of the next month
    },
    thisMonthEarnings: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    lastCalculatedViewsCount: { type: Number, default: 0 },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    viewsCount: { type: Number, default: 0 },
    // Interactions
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    viewers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // Comments
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

    // Flag for moderation
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Post = model("Post", postSchema);
export default Post;
