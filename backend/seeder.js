import dotenv from "dotenv";
import colors from "colors";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import users from "./data/users.js";
import User from "./models/userModel.js";
import Chat from "./models/chatModel.js";
import Message from "./models/messageModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});

    await User.insertMany(users);

    console.log("Data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});

    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
