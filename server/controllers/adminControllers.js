import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";

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

export { getAllUsers };
