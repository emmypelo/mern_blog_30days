import { Schema, model } from "mongoose";

const notificationSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Notification = model("Notification", notificationSchema);

export default Notification;
