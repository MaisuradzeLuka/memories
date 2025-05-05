import mongoose from "mongoose";

const comment = mongoose.Schema({
  comment: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  memory: { type: mongoose.Schema.Types.ObjectId, ref: "PostMemory" },
});

const Comment = mongoose.model("Comment", comment);
export default Comment;
