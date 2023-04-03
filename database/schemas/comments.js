import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    yId: {
      type: String,
      required: [true, "id is required"],
    },
    comment: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.comments ||
  mongoose.model("comments", CommentSchema);
