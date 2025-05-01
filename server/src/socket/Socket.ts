import { WebSocket } from "ws";
import ChatModel from "../model/ChatSchema";

const clients: Record<string, WebSocket> = {};

export const handleSocketConnection = (ws: WebSocket, userId: string) => {
  clients[userId] = ws;
  ws.on("message", async (message) => {
    try {
      const msg = JSON.parse(message.toString());
      if (msg.type === "private_message") {
        const newMessage = await ChatModel.create({
          sender: userId,
          receiver: msg.receiverId,
          content: msg.content,
        });
        const receiverSocket = clients[msg.receiverId];
        if (receiverSocket) {
          receiverSocket.send(
            JSON.stringify({
              type: "new_message",
              content: newMessage,
            })
          );
        }
      }
    } catch (e: any) {
      console.error("Error:", e.message);
      ws.send(JSON.stringify({ type: "error", message: "Server error" }));
    }
  });

  ws.on("close", () => {
    console.log("websockets disconnected");
    delete clients[userId];
  });
};
