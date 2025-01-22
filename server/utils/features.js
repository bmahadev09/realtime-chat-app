import mongoose, { get } from "mongoose";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

import { v4 as uuid } from "uuid";
import { getBased64, getSockets } from "../lib/helper.js";

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
    .json({ success: true, user, message });
};

const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map(async (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBased64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },

        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));

    return formattedResults;
  } catch (error) {
    throw new Error("Error uploading files to cloudinary", error);
  }
};

const deleteFilesFromCloudinary = async (public_id) => {
  // Delete file from cloudinary
};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
};
