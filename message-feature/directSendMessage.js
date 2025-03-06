import Message from '../models/message.js'
import Conversation from '../models/conversation.js'
import { updateChats } from './updatesChats.js'
// import conversation from '../models/conversation.js'
// import { updateChats } from './updates/updatesChat.js'


export async function directMessage(socket,data) {
    
    //steps to perform 
    //1.create a new message
    //2.check if the conversation exists between two users or not
    //3. if the their is already converstaion then push the new message in the conversataion
    //4.update it in real time
    //5. if their is no converstaion then create a new conversataion and update it real time 

    try{
        const {userId} = socket.user
        const {receiverId,content} = data
        console.log("receiverId:",receiverId)

        // create a new messages
        const message = await Message.create({
            author:userId,
            content:content,
            date: new Date(),
            type:"Direct",
        })
        console.log('messages created:',message)

        // find if the conversation exists between this two users - if not then create new 
        const isConversationExists = await Conversation.findOne({
            participants:{$all:[userId,receiverId]}
        })

        // // if conversation doesnt exists then it will show empty messages
        // if (!isConversationExists) {
        //     return socket.emit('direct-chat-history', { messages: [], participants: [userId, receiverId] });
        // }

        if(isConversationExists){
            isConversationExists.messages.push(message._id)
            await isConversationExists.save()

            // perform and update the conversation if is online
            console.log(`Fetching chat history for user: ${userId} and receiver: ${receiverId}`);
            updateChats(isConversationExists._id.toString())
        }else{
            // create a new conversation between two

            const newConversation = await Conversation.create({
                participants:[userId,receiverId],
                messages:[message._id],
            })
            
            // perform and update the conversation if its online
            console.log(`Fetching chat history for user: ${userId} and receiver: ${receiverId}`);
            updateChats(newConversation._id.toString())  //isConversationExists._id.toString()
        }
    }catch(error){
        console.error("direct Message error:",error)
    }
}