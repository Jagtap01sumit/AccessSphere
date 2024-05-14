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
      origin:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:3000"
          : "https://your-production-url.vercel.app",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    fetchDataFromMongoDB((err, data) => {
      if (err) {
        console.error("Error fetching data from MongoDB:", err);
      } else {
        socket.emit("dataFromServer", data);
      }
    });

    const changeStream = UserLogin.watch();
    changeStream.on("change", async (change) => {
      console.log("Data changed in MongoDB:", change);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  async function fetchDataFromMongoDB(callback) {
    try {
      const userData = await UserLogin.find({});
      console.log("Data fetched from MongoDB:", userData);
      callback(null, userData);
    } catch (err) {
      callback(err, null);
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
