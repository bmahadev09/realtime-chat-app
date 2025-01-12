import express from "express";
import { getAllUsers } from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/");
router.get("/verify");
router.get("/logout");

router.get("/users", getAllUsers);
router.get("/chats");

router.get("/messages");
router.get("/stats");

export default router;
