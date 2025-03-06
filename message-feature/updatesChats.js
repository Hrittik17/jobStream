// import User from '../../models/userModel.js'
import User from '../models/userModel.js'
import Conversation from '../models/conversation.js';
import Message from '../models/message.js'
import { getActiveUsers, getSocketServerInstance } from './socketConnections/serverstore.js';


// function to perform and updates messages if the users are online
export async function updateChats(conversationId, toSpecifiedSocketId = null) {
    // we are using tospecifiedSocketId because we want the chat history of that specific user
    try {
        const conversation = await Conversation.findOne({ _id: conversationId }).populate({
            path: 'messages',
            model: 'Message',
            populate: {
                path: 'author',
                model: 'User',
                select: 'userName _id'
            }
        });

        if (!conversation) return;

        const io = getSocketServerInstance();

        // If specific socket ID provided, emit only to that socket
        if (toSpecifiedSocketId) {
            return io.to(toSpecifiedSocketId).emit('direct-chat-history', {
                messages: conversation.messages,
                participants: conversation.participants
            });
        }

        // Emit to all active participants
        await Promise.all(conversation.participants.map(async (userId) => {
            const activeConnections = getActiveUsers(userId.toString());
            
            activeConnections.forEach((socketId) => {
                io.to(socketId).emit('direct-chat-history', {
                    messages: conversation.messages,
                    participants: conversation.participants
                });
            });
        }));

    } catch (error) {
        console.error('Error updating chat history:', error);
    }
}