import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
});

const user = mongoose.model("User", userSchema);

export default user;
