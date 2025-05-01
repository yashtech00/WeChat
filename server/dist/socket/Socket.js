"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketConnection = void 0;
const ChatSchema_1 = __importDefault(require("../model/ChatSchema"));
const clients = {};
const handleSocketConnection = (ws, userId) => {
    clients[userId] = ws;
    ws.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const msg = JSON.parse(message.toString());
            if (msg.type === "private_message") {
                const newMessage = yield ChatSchema_1.default.create({
                    sender: userId,
                    receiver: msg.receiverId,
                    content: msg.content,
                });
                const receiverSocket = clients[msg.receiverId];
                if (receiverSocket) {
                    receiverSocket.send(JSON.stringify({
                        type: "new_message",
                        content: newMessage,
                    }));
                }
            }
        }
        catch (e) {
            console.error("Error:", e.message);
            ws.send(JSON.stringify({ type: "error", message: "Server error" }));
        }
    }));
    ws.on("close", () => {
        console.log("websockets disconnected");
        delete clients[userId];
    });
};
exports.handleSocketConnection = handleSocketConnection;
