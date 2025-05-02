import express from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import { WebSocketServer } from "ws";
import cors from "cors";
import ConnectDb from "./model/db";
import { handleSocketConnection } from "./socket/Socket";
import AuthRouter from "./router/UserRouter";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import MessageRouter from "./router/MessageRoutes";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 8001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", AuthRouter);
app.use("/chat", MessageRouter);

wss.on("connection", (ws, req) => {
  const token = req.headers.cookie?.split("=")[1];
  if (!token) return ws.close();
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    handleSocketConnection(ws, decoded.id);
  } catch {
    ws.close();
  }
});
ConnectDb();
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
