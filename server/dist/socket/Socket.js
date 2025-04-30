"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketConnection = void 0;
const handleSocketConnection = (ws, req) => {
    ws.on("message", (message) => {
        console.log("Received:", message.toString());
        ws.send(`You sent: ${message.toString()}`);
    });
    ws.on("close", () => {
        console.log("websockets disconnected");
    });
};
exports.handleSocketConnection = handleSocketConnection;
