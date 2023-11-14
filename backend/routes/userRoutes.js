import express from "express";

import {
  authUser,
  getUserProfile,
  registerUser,
  sendSearchFriend,
  saveFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  notificationClearance,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);

router.route("/register").post(registerUser);
router.route("/profile").post(protect, getUserProfile);
router.route("/searchFriend").post(protect, sendSearchFriend);
router.route("/addFriendRequest").post(protect, saveFriendRequest);
router.route("/acceptFriendRequest").post(protect, acceptFriendRequest);
router.route("/declineFriendRequest").post(protect, declineFriendRequest);
router.route("/clearNotifications").post(protect, notificationClearance);

export default router;
