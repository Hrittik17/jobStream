import User from '../models/userModel.js'
import ContactInvitation from '../models/contactInvitation.js';
import { getActiveUsers, getSocketServerInstance } from './socketConnections/serverstore.js';


// export async function updateFriendsPendingInvitation(userId){
//     try{
//         // const pendingInvitation = await FriendInvitation.findOne({senderId:userId}).populate("senderId","_id userName email")
//         const pendingInvitation = await contactInvitation.find({ receiverId: userId }).populate("senderId", "_id userName email");

//         //find if the userof specified userId has active connections 
//         const receiverList = getActiveUsers(userId)

//         const io = getSocketServerInstance()

//         //emitting the friends-invitations events
//         receiverList.forEach((receiverSocketId)=>{
//             io.to(receiverSocketId).emit('friends-invitations',{
//                 pendingInvitation:pendingInvitation ? pendingInvitation : []
//             })
//         })

//     }catch(error){
//         console.error(error)
//         throw new Error(error)

//     }
// }

// Update Pending Invitations (With Service Details)
export async function updateFriendsPendingInvitation(userId) {
    try {
        const pendingInvitations = await ContactInvitation.find({ receiverId: userId })
            .populate("senderId", "_id fullName email")
            .populate("serviceId", "title description servicesAmount");

        const receiverList = getActiveUsers(userId);
        const io = getSocketServerInstance();

        receiverList.forEach(receiverSocketId => {
            io.to(receiverSocketId).emit('friends-invitations', {
                pendingInvitations: pendingInvitations || []
            });
        });

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}



export async function myFriends(userId){
    try{

        // find active connection of a specified user(online user)
        const receiverList = getActiveUsers(userId)
        if(receiverList.length > 0){
            // check wheither user exists or not and populate data
            const isUserExists = await User.findById(userId,{_id:1,Contacts:1}).populate('Contacts','_id fullName email avatar')

            if(!isUserExists){
                return res.status(404).json('There is no user')
            }
            const ContactsList = isUserExists.Contacts.map((Contact)=>{
                return {
                    id:Contact._id,
                    email:Contact.email,
                    userName:Contact.fullName,
                    avatar:Contact.avatar
                }
            })

            // console.log('Contact list in backend :',ContactsList)

            // get the io instace from the serverstore so we can emit the event

            const io = getSocketServerInstance()

            // triggering the event friends-list
            receiverList.forEach((receiverSocketId)=>{     // receiverSocketId because every friend will have a scoketId 
                io.to(receiverSocketId).emit('friends-list',{
                    Contacts:ContactsList ? ContactsList : []   // creating a object named friends so we can get friends
                })
            })
        }
    }catch(error){
        console.error(error)
        // throw new Error(error)
    }
}