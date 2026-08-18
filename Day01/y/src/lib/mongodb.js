import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserShcema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  { timestamps: true },
);

const DB_URL = process.env.DB_URL;
if (!DB_URL) {
  throw new Error("Please define DB_URL in your .env file");
}

try {
  mongoose.connect(DB_URL);
  console.log("DB connected successfully");
} catch (err) {
  console.log(err);
}

export const UserModel =
  mongoose.models.users || mongoose.model("users", UserShcema);
console.log(UserModel);
