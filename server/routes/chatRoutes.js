import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { getMyChats, newGroupChat } from "../controllers/chatControllers.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/new", newGroupChat);
router.get("/my-chats", getMyChats);

export default router;
