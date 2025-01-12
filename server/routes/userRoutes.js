import express from "express";
import {
  acceptFriendRequest,
  getMyFriends,
  getMyProfile,
  getNotifications,
  login,
  logoutUser,
  newUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/userControllers.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  acceptRequestValidation,
  loginValidation,
  registerValidation,
  sendRequestValidation,
  validateHandler,
} from "../lib/validators.js";

const router = express.Router();

// Login route
router.post(
  "/new",
  singleUpload,
  registerValidation(),
  validateHandler,
  newUser
);
router.post("/login", loginValidation(), validateHandler, login);

//After here user must be authenticated to access the routes
router.use(isAuthenticated);

router.get("/profile", getMyProfile);
router.get("/logout", logoutUser);
router.get("/search", searchUser);
router.put(
  "/send-request",
  sendRequestValidation(),
  validateHandler,
  sendFriendRequest
);

router.put(
  "/accept-request",
  acceptRequestValidation(),
  validateHandler,
  acceptFriendRequest
);

router.get("/notifications", getNotifications);

router.get("/friends", getMyFriends);

export default router;
