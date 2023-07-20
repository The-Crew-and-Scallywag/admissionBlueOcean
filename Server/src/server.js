import express from "express";
import { router } from "./Router/router.js";
import cors from "cors";
import dotenv from "dotenv";
import setupWSConnection from "./ws.cjs";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", setupWSConnection);

dotenv.config();
// DO NOT TOUCH THIS WHY ARE YOU TOUCHING THIS
const PORT = process.env.PORT;
// STOP TOUCHING NO TOUCHY
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.get("/interview", (req, res) => {
  console.log("Interview route hit");
  res.sendStatus(200);
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

server.on("upgrade", (request, socket, head) => {
  console.log("Parsing session from request...");
  /**
   * @param {any} ws
   */
  const handleAuth = (ws) => {
    wss.emit("connection", ws, request);
  };
  wss.handleUpgrade(request, socket, head, handleAuth);
});

export default app;
