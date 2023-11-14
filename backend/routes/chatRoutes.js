import express from "express";

import {
  createChat,
  findChat,
  findUsersChats,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createChat);
router.get("/:userId", protect, findUsersChats);
router.post("/find/:firstId/:secondId", protect, findChat);

export default router;
