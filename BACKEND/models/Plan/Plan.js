import { Schema, model } from "mongoose";

const planSchema = new Schema(
  {
    planName: { type: String, required: true },
    features: [String],
    price: { type: Number, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Plan", planSchema);
