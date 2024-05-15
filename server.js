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
      origin: "https://access-sphere.vercel.app,http://localhost:3000",

      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.log("A user connected");

    const userData = await fetchDataFromMongoDB();

    io.emit("dataFromServer", userData);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
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

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
