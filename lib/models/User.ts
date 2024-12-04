import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "viewer", "creator", "editor"],
    default: "viewer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Users = mongoose.models.Users || mongoose.model("Users", userSchema);
export default Users;
