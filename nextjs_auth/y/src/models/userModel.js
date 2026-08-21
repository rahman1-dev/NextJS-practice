import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "User already exists"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "User already exists"],
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModle = mongoose.models.users || mongoose.model("users", UserSchema);

export default UserModle;
