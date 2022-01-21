import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  fullName: String,
  password: String,
  avatar: String,
  images: [String],
  privacy: String
});

const User = mongoose.model("User", userSchema);

export default User;