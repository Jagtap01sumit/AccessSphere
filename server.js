import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import connectDB from "./src/config/Db.js";
import UserLogin from "./src/Models/LoginUser.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

connectDB();

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",

      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.log("A user connected", socket.id);

    const userData = await fetchDataFromMongoDB();
    io.emit("dataFromServer", userData);

    //
    console.log("a user connected", socket.id);
    const userId = socket.handshake.query.userId;
    console.log(userId, "userId");

    if (userId != undefined) userSocketMap[userId] = socket.id;
    //io.emit() is used to send evens to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    //

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  async function fetchDataFromMongoDB() {
    try {
      const userData = await UserLogin.find({});
      return userData;
    } catch (err) {
      console.log(err);
    }
  }

  //
  const userSocketMap = {}; //{userid:socketId}
  //

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
