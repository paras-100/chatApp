import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import { Server } from "socket.io";
import { createServer } from "http";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());

app.get("/", (req, res) => {
  res.json("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// Create a static folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bold.yellow
  );
});

export default app;
