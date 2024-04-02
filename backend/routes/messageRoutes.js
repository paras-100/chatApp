import express from "express";

import {
  createMessage,
  getMessages,
  deleteChats,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessages);
router.post("/deleteChats", protect, deleteChats);

export default router;
