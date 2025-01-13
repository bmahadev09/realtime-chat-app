import express from "express";
import {
  adminLogin,
  adminLogout,
  allChats,
  allMessages,
  getAdminData,
  getAllUsers,
  getDashboardStats,
} from "../controllers/adminControllers.js";
import { adminLoginValidation, validateHandler } from "../lib/validators.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/verify", adminLoginValidation(), validateHandler, adminLogin);
router.get("/logout", adminLogout);

//These routes only admin can access

router.use(isAdmin);

router.get("/", getAdminData);
router.get("/users", getAllUsers);
router.get("/chats", allChats);

router.get("/messages", allMessages);
router.get("/stats", getDashboardStats);

export default router;
