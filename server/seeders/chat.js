import { faker, simpleFaker } from "@faker-js/faker";
import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";
import { Message } from "../models/messageModel.js";

const createSingleChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        const tempChat = Chat.create({
          name: faker.lorem.word(2),
          members: [users[i], users[j]._id],
        });

        chatsPromise.push(tempChat);
      }
    }

    await Promise.all(chatsPromise);

    console.log("Single chats created");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createGroupChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });

      const members = [];

      for (let j = 0; j < numMembers; j++) {
        const randomIndex = Math.floor(Math.random() * users.length);

        const randomUser = users[randomIndex];

        if (!members.includes(randomUser)) {
          members.push(randomUser);
        }
      }

      const tempChat = Chat.create({
        groupChat: true,
        name: faker.lorem.word(1),
        members,
        creator: members[0],
      });

      chatsPromise.push(tempChat);
    }

    await Promise.all(chatsPromise);

    console.log("Group chats created");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createMessages = async (numMessages) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");

    const messagesPromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomChat = chats[Math.floor(Math.random() * chats.length)];

      const tempMessage = Message.create({
        chat: randomChat,
        sender: randomUser,
        content: faker.lorem.sentence(10),
      });

      messagesPromise.push(tempMessage);
    }

    await Promise.all(messagesPromise);

    console.log("Messages created");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createMessageInAChat = async (numMessages, chatId) => {
  try {
    const users = await User.find().select("_id");

    const messagesPromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const tempMessage = Message.create({
        chat: chatId,
        sender: randomUser,
        content: faker.lorem.sentence(10),
      });

      messagesPromise.push(tempMessage);
    }

    await Promise.all(messagesPromise);

    console.log("Messages created");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export {
  createSingleChats,
  createGroupChats,
  createMessages,
  createMessageInAChat,
};
