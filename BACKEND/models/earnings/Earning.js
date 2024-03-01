import { Schema, model } from "mongoose";

const earningSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    amount: { type: Number, required: true },
    calculatedOn: { type: Date, default: Date.now() },
  },

  { timestamps: true }
);

const Earning = model("Earning", earningSchema);

export default Earning;
