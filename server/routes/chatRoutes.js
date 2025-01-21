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
import {
  addMemberValidation,
  chatIdValidation,
  newGroupValidation,
  removeMemberValidation,
  renameGroupValidation,
  sendAttachmentsValidation,
  validateHandler,
} from "../lib/validators.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/new", newGroupValidation(), validateHandler, newGroupChat);
router.get("/my-chats", getMyChats);
router.get("/my-chats/groups", getMyGroups);
router.put("/add-members", addMemberValidation(), validateHandler, addMembers);
router.put(
  "/remove-member",
  removeMemberValidation(),
  validateHandler,
  removeMember
);
router.delete("/leave/:id", chatIdValidation(), validateHandler, leaveGroup);

//send Attachment
router.post("/message", attachmentsUpload, sendAttachments);

//get messages
router.get("/messages/:id", chatIdValidation(), validateHandler, getMessages);

//get chat details, rename, delete chat
router
  .route("/:id")
  .get(chatIdValidation(), validateHandler, getChatDetails)
  .put(renameGroupValidation(), validateHandler, renameGroup)
  .delete(chatIdValidation(), validateHandler, deleteChat);

export default router;
