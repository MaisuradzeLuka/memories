import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  avatar: {
    type: String,
    required: false,
    default: "/static/images/default-avatar.jpg",
  },
  bio: { type: String, required: false },
});

const user = mongoose.model("User", userSchema);

export default user;
