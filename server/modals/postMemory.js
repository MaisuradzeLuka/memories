import mongoose from "mongoose";

const postMemory = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
  author: String,
});

const PostMemory = mongoose.model("PostMemory", postMemory);

export default PostMemory;
