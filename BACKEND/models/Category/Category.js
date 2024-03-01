import { Schema, model } from "mongoose";
//schema
const categorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
    description: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
//model
const Category = model("Category", categorySchema);
export default Category;
