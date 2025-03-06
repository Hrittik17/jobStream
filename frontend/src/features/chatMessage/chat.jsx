import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Chat({ chatRoomId, userId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        socket.emit("join_room", chatRoomId);

        socket.on("receive_message", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("receive_message");
        };
    }, [chatRoomId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const messageData = { chatRoomId, sender: userId, text: newMessage };
        socket.emit("send_message", messageData);
        setMessages((prev) => [...prev, messageData]);
        setNewMessage("");
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === userId ? "sent" : "received"}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
