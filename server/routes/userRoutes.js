import express from "express";
import {
  getMyProfile,
  login,
  logoutUser,
  newUser,
  searchUser,
} from "../controllers/userControllers.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  loginValidation,
  registerValidation,
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

export default router;
