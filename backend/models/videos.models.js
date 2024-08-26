import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  description: {
    type: String,
    maxLength: 1024,
  },
  url: {
    type: String,
    required: true,
  },
  sequence: {
    type: Number,
    required: true,
    unique: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Videos = mongoose.model("videos", videoSchema);
export default Videos;
