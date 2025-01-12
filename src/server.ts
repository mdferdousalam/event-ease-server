import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;
let io: SocketServer;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Database connected successfully`);
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });

    // Initialize Socket.IO
    io = new SocketServer(server, {
      cors: {
        origin: [
          "http://localhost:3000",
          "http://localhost:5000",
        ],
        methods: ["GET", "POST"],
      },
    });

    // Handle Socket.IO connections
    io.on("connection", (socket) => {
      console.log(`New client connected: ${socket.id}`);

      // Handle custom events from the client
      socket.on("message", (data) => {
        console.log("Message received:", data);

        // Emit an event back to the client
        socket.emit("response", { message: "Message received by server!" });
      });

      // Handle client disconnection
      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });

    console.log("Socket.IO is running...");
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});

export { io };