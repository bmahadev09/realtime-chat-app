import { compare } from "bcrypt";
import { User } from "../models/userModel.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { Errorhandler } from "../utils/utility.js";

//Create new user and send token in cookie
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "asjhd",
    url: "asdasdasd",
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User created successfully");
};

//Login user and send token in cookie
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new Errorhandler("Invalid credentials", 404));
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return next(new Errorhandler("Invalid credentials", 404));
  }

  sendToken(res, user, 200, `Welcome back, ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  });
});

const logoutUser = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("secretToken", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

const searchUser = TryCatch(async (req, res) => {
  const { name } = req.query;

  return res.status(200).json({
    success: true,
    message: name,
  });
});

export { login, newUser, getMyProfile, logoutUser, searchUser };
