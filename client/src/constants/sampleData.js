export const sampleChats = [
  {
    _id: "1",
    name: "John Doe",
    avatar: ["https://rachelziv.com.au/wp-content/uploads/2020/01/happy.jpg"],
    groupChat: false,
    sameSender: false,
    isOnline: true,
    members: ["1", "2"],
  },
  {
    _id: "2",
    name: "Jane Doe",
    avatar: ["https://rachelziv.com.au/wp-content/uploads/2020/01/happy.jpg"],
    groupChat: false,
    sameSender: false,
    isOnline: true,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    _id: "1",
    name: "John Doe",
    avatar: "https://rachelziv.com.au/wp-content/uploads/2020/01/happy.jpg",
  },
  {
    _id: "2",
    name: "Jane Doe",
    avatar: "https://rachelziv.com.au/wp-content/uploads/2020/01/happy.jpg",
  },
];

export const sampleNotifications = [
  {
    _id: "1",
    sender: {
      name: "John Doe",
      avatar: "https://rachelziv.com.au/wp-content/uploads/2020/01/happy.jpg",
    },
  },
  {
    _id: "2",
    sender: {
      name: "John Doe",
      avatar: "https://rachelziv.com.au/wp-content/uploads/2020/01/happy.jpg",
    },
  },
];

export const sampleMessages = [
  {
    attachments: [
      {
        public_id: "image",
        url: "https://rachelziv.com.au/wp-content/uploads/2020/01/happy.jpg",
      },
    ],
    content: "Hello",
    _id: "erg45645rth",
    sender: {
      _id: "user._id",
      name: "John Doe",
    },
    chat: "chatId",
    createdAt: "2021-12-12T12:12:12.000Z",
  },
  {
    attachments: [
      {
        public_id: "image2",
        url: "https://rachelziv.com.au/wp-content/uploads/2020/01/happy.jpg",
      },
    ],
    content: "hi",
    _id: "erg45645rtjhh",
    sender: {
      _id: "fgdgert",
      name: "Jane Do2",
    },
    chat: "chatId",
    createdAt: "2021-12-12T12:12:12.000Z",
  },
];
