import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chatModel.js";
import { emitEvent } from "../utils/features.js";
import { Errorhandler } from "../utils/utility.js";
import { User } from "../models/userModel.js";

const newGroupChat = TryCatch(async (req, res) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Group must have at least 3 members",
    });
  }

  const allMembers = [...members, req.user];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group chat`);
  emitEvent(req, REFETCH_CHATS, members);

  res.status(200).json({
    success: true,
    message: "Group created successfully",
  });
});

const getMyChats = TryCatch(async (req, res) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name avatar"
  );

  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMember = getOtherMember(members, req.user);

    return {
      _id,
      groupChat,
      name: groupChat ? name : otherMember.name,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],

      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }

        return prev;
      }, []),
    };
  });

  res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");

  const groups = chats.map(({ _id, name, members, groupChat }) => ({
    _id,
    name,
    groupChat,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));

  res.status(200).json({
    success: true,
    groups,
  });
});

const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  if (!members || members.length === 0) {
    return next(new Errorhandler("Select members to add", 400));
  }

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new Errorhandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new Errorhandler("This is not a group chat", 400));
  }

  if (chat.creator.toString() !== req.user.toString()) {
    return next(new Errorhandler("You are not allowed to add members", 403));
  }

  const allNewMembersPromise = members.map((member) =>
    User.findById(member, "name ")
  );

  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((member) => !chat.members.includes(member._id.toString()))
    .map(({ _id }) => _id);

  chat.members.push(...uniqueMembers);

  if (chat.members.length > 100) {
    return next(new Errorhandler("Group members limit reached", 400));
  }

  await chat.save();

  const allUsersName = allNewMembers.map(({ name }) => name).join(", ");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allUsersName} has been added to the group`
  );

  emitEvent(req, REFETCH_CHATS, chat.members);

  res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
});

const removeMember = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;

  const [chat, user] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) {
    return next(new Errorhandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new Errorhandler("This is not a group chat", 400));
  }

  if (chat.creator.toString() !== req.user.toString()) {
    return next(new Errorhandler("You are not allowed to remove members", 403));
  }

  if (chat.members.length <= 3) {
    return next(new Errorhandler("Group must have at least 3 members", 400));
  }

  // const index = chat.members.indexOf(userId);

  // if (index === -1) {
  //   return next(new Errorhandler("User not found", 404));
  // }

  // chat.members.splice(index, 1);

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${user.name} has been removed from the group`
  );

  emitEvent(req, REFETCH_CHATS, chat.members);

  res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new Errorhandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new Errorhandler("This is not a group chat", 400));
  }

  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );

  if (remainingMembers.length < 3) {
    return next(new Errorhandler("Group must have at least 3 members", 400));
  }

  if (chat.creator.toString() === req.user.toString()) {
    const randomIndex = Math.floor(Math.random() * remainingMembers.length);

    chat.creator = remainingMembers[randomIndex];
  }

  chat.members = remainingMembers;

  // const user = await User.findById(req.user, "name");

  const [user] = await Promise.all([
    User.findById(req.user, "name"),
    chat.save(),
  ]);

  emitEvent(req, ALERT, chat.members, ` ${user.name} has left the group`);

  res.status(200).json({
    success: true,
    message: "You have left the group",
  });
});

export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
};
