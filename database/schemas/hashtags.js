import mongoose, { Schema } from "mongoose";

const HashtagSchema = new mongoose.Schema(
  {
    yId: {
      type: String,
      required: [true, "id is required"],
    },
    hashtag: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.hashtags ||
  mongoose.model("hashtags", HashtagSchema);
