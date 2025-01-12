import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chatControllers.js";
import { attachmentsUpload } from "../middlewares/multer.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/new", newGroupChat);
router.get("/my-chats", getMyChats);
router.get("/my-chats/groups", getMyGroups);
router.put("/add-members", addMembers);
router.put("/remove-member", removeMember);
router.delete("/leave/:id", leaveGroup);

//send Attachment
router.post("/message", attachmentsUpload, sendAttachments);

//get messages
router.get("/messages/:id", getMessages);

//get chat details, rename, delete chat
router.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default router;
