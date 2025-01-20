import { compare } from "bcrypt";
import { User } from "../models/userModel.js";
import {
  cookieOptions,
  emitEvent,
  sendToken,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { Errorhandler } from "../utils/utility.js";
import { Chat } from "../models/chatModel.js";
import { Request } from "../models/requestModel.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";

//Create new user and send token in cookie
const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;

  const file = req.file;

  if (!file) {
    return next(new Errorhandler("Please upload a avatar", 400));
  }

  const result = await uploadFilesToCloudinary([file]);

  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User created successfully");
});

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

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) {
    return next(new Errorhandler("User not found", 404));
  }

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
  const { name = "" } = req.query;

  //Get all my chats except group chats
  const myChats = await Chat.find({
    groupChat: false,
    members: req.user,
  });

  //Get all users from my chats
  const allUsersFromMyChats = myChats.map((chat) => chat.members).flat(); //flat() use this or flatMap() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.

  //get all users from my chats except me and the users I have already chatted with
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });

  //modify the data to send to the client side
  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    users,
  });
});

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) {
    return next(new Errorhandler("Request already sent", 400));
  }

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Friend request sent",
  });
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) {
    return next(new Errorhandler("Request not found", 404));
  }

  if (request.receiver._id.toString() !== req.user.toString()) {
    return next(
      new Errorhandler("You are not authorized to accept this request ", 401)
    );
  }

  if (!accept) {
    await request.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Friend request declined",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Friend request accepted",
    senderId: request.sender._id,
  });
});

const getNotifications = TryCatch(async (req, res) => {
  const requests = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );

  const allRequests = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));

  return res.status(200).json({
    success: true,
    allRequests,
  });
});

const getMyFriends = TryCatch(async (req, res) => {
  const chatId = req.query.chatId;

  const myChats = await Chat.find({
    groupChat: false,
    members: req.user,
  }).populate("members", "name avatar");

  const friends = myChats.map(({ members }) => {
    const getOtherUser = getOtherMember(members, req.user);

    return {
      _id: getOtherUser._id,
      name: getOtherUser.name,
      avatar: getOtherUser.avatar.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);

    const availableFriends = friends.filter((friend) => {
      return !chat.members.includes(friend._id);
    });

    return res.status(200).json({
      success: true,
      friends: availableFriends,
    });
  } else {
    return res.status(200).json({
      success: true,
      friends,
    });
  }
});

export {
  login,
  newUser,
  getMyProfile,
  logoutUser,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getNotifications,
  getMyFriends,
};
