import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";
import { Message } from "../models/messageModel.js";
import { Errorhandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../utils/features.js";
import { adminSecretKey } from "../app.js";

const adminLogin = TryCatch(async (req, res, next) => {
  const { secretKey } = req.body;

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched) {
    return next(new Errorhandler("Invalid secret key", 401));
  }

  const token = jwt.sign(secretKey, process.env.JWT_SECRET);

  return res
    .status(200)
    .cookie("admin-token", token, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 15,
    })
    .json({
      success: true,
      message: "Admin logged in successfully",
    });
});

const adminLogout = TryCatch(async (req, res, next) => {
  return res
    .cookie("admin-token", " ", {
      ...cookieOptions,
      maxAge: 0,
    })
    .json({
      success: true,
      message: "Admin logged out successfully",
    });
});

const getAdminData = TryCatch(async (req, res, next) => {
  return res.status(200).json({
    admin: true,
  });
});

const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ members: _id, groupChat: true }),
        Chat.countDocuments({ members: _id, groupChat: false }),
      ]);

      return {
        _id,
        name,
        username,
        avatar: avatar.url,
        groups,
        friends,
      };
    })
  );

  res.status(200).json({
    success: true,
    users: transformedUsers,
  });
});

const allChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ members, _id, groupChat, name, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: _id });

      return {
        _id,
        name,
        groupChat,
        avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
        members: members.map(({ _id, name, avatar }) => ({
          _id,
          name,
          avatar: avatar.url,
        })),
        creator: {
          name: creator?.name || "none",
          avatar: creator?.avatar.url || "",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );

  res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const allMessages = TryCatch(async (req, res, next) => {
  const messages = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");

  const transformMessages = messages.map(
    ({ _id, sender, chat, content, createdAt, attachments }) => ({
      _id,
      attachments,
      content,
      groupChat: chat.groupChat,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
      chat: chat._id,
      createdAt,
    })
  );

  res.status(200).json({
    success: true,
    messages: transformMessages,
  });
});

const getDashboardStats = TryCatch(async (req, res, next) => {
  const [groupsCount, totalUsers, totalChats, totalMessages] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments(),
      Chat.countDocuments(),
      Message.countDocuments(),
    ]);

  const today = new Date();

  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  const last7DaysMessages = await Message.find({
    createdAt: { $gte: lastWeek, $lte: today },
  }).select("createdAt");

  const messages = new Array(7).fill(0);

  const dayInMileSeconds = 24 * 60 * 60 * 1000;

  last7DaysMessages.forEach((message) => {
    const indexApprox =
      (today.getTime() - message.createdAt.getTime()) / dayInMileSeconds;

    const index = Math.floor(indexApprox);

    messages[6 - index]++;
  });

  const stats = {
    groupsCount,
    totalUsers,
    totalChats,
    totalMessages,
    messagesChart: messages,
  };

  res.status(200).json({
    success: true,
    stats,
  });
});

export {
  getAllUsers,
  allChats,
  allMessages,
  getDashboardStats,
  adminLogin,
  adminLogout,
  getAdminData,
};
