import asyncHandler from "express-async-handler";

import Message from "../models/messageModel.js";

/**
 *  @desc		Create Message
 *  @route	POST /api/messages
 * 	@access	private
 */
export const createMessage = asyncHandler(async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const messageFound = await Message.findOne({ chatId });

  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const pushMessage = {
    senderId,
    text,
    date: `${date.getDate()} ${monthNames[date.getMonth()]}`,
    time: `${date.toLocaleTimeString()}`,
  };

  try {
    if (messageFound) {
      await messageFound.Chats.push(pushMessage);
      await messageFound.save();

      const mes = Object.values(messageFound.Chats)[
        Object.keys(messageFound.Chats).length - 1
      ];

      res.status(200).json(mes);
    } else {
      const messages = await Message.create({ chatId });

      if (messages) {
        await messages.Chats.push(pushMessage);
        await messages.save();

        const mes = Object.values(messages.Chats)[
          Object.keys(messages.Chats).length - 1
        ];

        res.status(200).json(mes);
      } else {
        res.status(501);
        throw new Error("Message was not created");
      }
    }
  } catch (err) {
    res.status(500);
    throw new Error(err ? err : "Internal Server Error");
  }
});

/**
 *  @desc		Create Message
 *  @route	GET /api/messages/:chatId
 * 	@access	private
 */
export const getMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chatId });

    if (messages) {
      res.status(200).json(messages);
    } else {
      res.json(404);
      throw new Error("Messages not found");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err ? err : "Internal Server Error");
  }
});

/**
 *  @desc		Delete Message
 *  @route	POST /api/messages/deleteChats
 * 	@access	private
 */
export const deleteChats = asyncHandler(async (req, res) => {
  const { chatId } = req.body;

  const messageDoc = (await Message.find({ chatId }))[0];

  if (messageDoc) {
    messageDoc.Chats = messageDoc.Chats.slice(0, 1);

    await messageDoc.save();

    res.status(200).json(messageDoc);
  } else {
    res.json(404);
    throw new Error("ChatID not found");
  }
});
