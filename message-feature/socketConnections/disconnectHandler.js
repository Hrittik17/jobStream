import { removeConnectUsers } from "./serverstore.js";

export function disconnectUserHandler(socket) {
    // console.log(`Disconnecting user with socketId: ${socket.id}`);
    removeConnectUsers(socket.id); // This should handle removal logic
    // emitOnlineUsers(); // Ensure this emits after the user is removed
}