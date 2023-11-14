import asyncHandler from "express-async-handler";

import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

/**
 *  @desc		Create Chat
 *  @route	POST /api/chat
 * 	@access	private
 */
const createChat = asyncHandler(async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      res.json(chat);
    } else {
      const newChat = await Chat.create({ members: [firstId, secondId] });

      if (newChat) {
        res.json({ newChat: true });
      }
    }
  } catch (err) {
    res.status(500);
    throw new Error("Internal Server Error", err);
  }
});

/**
 *  @desc		Find all user Chat
 *  @route	GET /api/chat/:userId
 * 	@access	private
 */
const findUsersChats = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await Chat.find({
      members: { $in: [userId] },
    });

    if (chats) {
      res.status(200).json(chats);
    } else {
      res.status(404);
      throw new Error("No Chats found for user");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err ? err : "Internal Server Error");
  }
});

/**
 *  @desc		Find Chat between two users
 *  @route	GET /api/:firstId/:secondId
 * 	@access	private
 */
const findChat = asyncHandler(async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      const messages = await Message.findOne({ chatId: chat._id });
      messages.Chats.map((mes) => {
        console.log(mes);
      });

      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(200).json({ chatId: chat._id, Chats: [] });
      }
    } else {
      res.status(404);
      throw new Error(`Could not find a chat`);
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

export { createChat, findChat, findUsersChats };
