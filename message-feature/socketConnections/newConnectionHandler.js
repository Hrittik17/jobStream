import { myFriends, updateFriendsPendingInvitation } from "../updateFriends.js"
import { addNewConnectedUser } from "./serverstore.js"

export async function newConnectionHandler(socket,io){
    try{

        addNewConnectedUser({
            socketId:socket.id,
            userId:socket.user.userId,
        })
        
        // update pending friends invitation list
        updateFriendsPendingInvitation(socket.user.userId)
        
        // getting a users friends list 
        myFriends(socket.user.userId)
    }catch(error){
        console.error(error)
    }
}
