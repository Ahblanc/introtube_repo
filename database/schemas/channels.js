import mongoose, { Schema } from "mongoose";

const ChannelSchema = new mongoose.Schema(
  {
    yId: {
      type: String,
      required: [true, "id is required"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    customUrl: {
      type: String,
    },
    subscriberCount: {
      type: Number,
    },
    detailClickCount: {
      type: Number,
    },
    thumbnails: {
      type: String,
    },
    banner: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.channels ||
  mongoose.model("channels", ChannelSchema);
