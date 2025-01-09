import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  maxAge: 10 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  secure: true,
};

const connectDB = async (uri) => {
  await mongoose
    .connect(uri)
    .then(() => {
      console.log(`Connected to MongoDB:`);
    })
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, statusCode, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return res
    .status(statusCode)
    .cookie("secretToken", token, cookieOptions)
    .json({ success: true, message });
};

const emitEvent = (req, event, users, data) => {
  console.log("Emitting event", event);
};

export { connectDB, sendToken, cookieOptions, emitEvent };
