import { Server } from "socket.io";
import { createServer } from "http";
import app from "./server.js";

const httpServer = createServer(app);
const io = new Server(httpServer);

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("userConnected", socket.id);

  // *Add New Online User
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) && userId
      ? onlineUsers.push({
          userId,
          socketId: socket.id,
        })
      : null;

    console.log("onlineUsers", onlineUsers);

    socket.emit("getOnlineUsers", onlineUsers);
    socket.broadcast.emit("getOnlineUsers", onlineUsers);
  });

  // *Recieve And Send Message
  socket.on("sendMessage", (res) => {
    const user = onlineUsers.find((user) => user.userId === res.recieverId);
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

    const message = {
      senderId: res.senderId,
      text: res.text,
      date: `${date.getDate()} ${monthNames[date.getMonth()]}`,
      time: `${date.toLocaleTimeString()}`,
    };

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  // *Remove New Online User
  socket.on("removeOnlineUser", (userId) => {
    onlineUsers.map((user, index) => {
      if (user.userId === userId) {
        onlineUsers.splice(index, 1);
        console.log(onlineUsers);
      }
    });

    console.log("onlineUsers", onlineUsers);

    socket.emit("getOnlineUsers", onlineUsers);
    socket.broadcast.emit("getOnlineUsers", onlineUsers);
  });
});

httpServer.listen(
  8080,
  console.log(`Socket server running on port 8080`.bold.red)
);
