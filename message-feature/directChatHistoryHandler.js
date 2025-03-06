import Conversation from '../models/conversation.js'

export async function directChatHistoryHandler(socket, data) {
    try {
        const { userId } = socket.user;
        const { receiverId } = data;

         // Find or create conversation means we have to populate if its not created or we havent found.
        let conversation = await Conversation.findOne({
            participants: { $all: [userId, receiverId] }
        }).populate({
            path: 'messages',
            model: 'Message',
            populate: {
                path: 'author',
                model: 'User',
                select: 'fullName email _id'
            }
        });

        // if (isConversationExists) {
        //     // Emit the chat history to the requesting socket
        //     updateChats(isConversationExists._id.toString(), socket.id);
        // }
          // If no conversation exists, return empty state
          if (!conversation) {
            return socket.emit('direct-chat-history', {
                messages: [],
                participants: [userId, receiverId]
            });
        }

        // Emit chat history to the requesting socket
        socket.emit('direct-chat-history', {
            messages: conversation.messages,
            participants: conversation.participants
        });
    } catch (error) {
        console.error("Direct chat history error:", error);
    }
}