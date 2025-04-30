"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ws_1 = require("ws");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./model/db"));
const Socket_1 = require("./socket/Socket");
const UserRouter_1 = __importDefault(require("./router/UserRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
const PORT = process.env.PORT || 8001;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/user", UserRouter_1.default);
wss.on("connection", (ws, req) => {
    (0, Socket_1.handleSocketConnection)(ws, req);
});
(0, db_1.default)();
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
