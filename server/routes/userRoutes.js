import express from "express";
import {
  getMyProfile,
  login,
  logoutUser,
  newUser,
} from "../controllers/userControllers.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Login route
router.post("/new", singleUpload, newUser);
router.post("/login", login);

//After here user must be authenticated to access the routes
router.use(isAuthenticated);

router.get("/profile", getMyProfile);
router.get("/logout", logoutUser);

export default router;
