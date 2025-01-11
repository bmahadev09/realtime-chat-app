import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/new", newGroupChat);
router.get("/my-chats", getMyChats);
router.get("/my-chats/groups", getMyGroups);
router.put("/add-members", addMembers);
router.put("/remove-member", removeMember);
router.delete("/leave/:id", leaveGroup);

export default router;
