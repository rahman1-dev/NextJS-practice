import mongoose from "mongoose";
import { NextResponse } from "next/server";

export default await function connectDb() {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("DB connected");

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB error , please check the connection::", err);
      process.exit();
    });
  } catch (error) {
    console.log("MongoDB error :: ", error.message);
    NextResponse.json({
      msg: "Database error , check the connection",
      error: error.message,
    });
  }
};
