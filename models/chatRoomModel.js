import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

export default mongoose.model("ChatRoom", chatRoomSchema);
