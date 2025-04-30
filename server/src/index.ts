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

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });


const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/user", AuthRouter);

wss.on("connection", (ws, req) => {
  handleSocketConnection(ws, req);
});
ConnectDb();
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
