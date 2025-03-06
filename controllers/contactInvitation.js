import User from '../models/userModel.js';
import ContactInvitation from '../models/contactInvitation.js';
import { myFriends, updateFriendsPendingInvitation } from '../message-feature/updateFriends.js';
import { log } from 'console';
import message from '../models/message.js';

// export async function httpInviteFriend(req, res) {
//     try {
//         const { friendEmail } = req.body;
//         const { userId } = req.user;

//         // Check if the user exists
//         const isUserValid = await User.findOne({ email: friendEmail });
//         if (!isUserValid) {
//             return res.status(404).json({ message: "That user does not exist" });
//         }

//         // Check if the user is inviting themselves
//         if (isUserValid._id.toString() === userId.toString()) {
//             return res.status(401).json({ message: "You cannot invite yourself" });
//         }

//         // Check if an invitation is already sent
//         const isInvitationAlreadyReceived = await ContactInvitation.findOne({
//             senderId: userId,
//             receiverId: isUserValid._id,
//         });
//         if (isInvitationAlreadyReceived) {
//             return res.status(409).json({ message: "Invitation is already sent" });
//         }

//         // Check if the user is already a friend
//         const isAlreadyFriend = isUserValid.Contacts.find((friendId) =>
//             friendId.toString() === userId.toString()
//         );
//         if (isAlreadyFriend) {
//             return res.status(409).json({ message: "You are already friends" });
//         }

//         // Create a new friend invitation
//         const newFriendInvitation = new ContactInvitation({
//             senderId: userId,
//             receiverId: isUserValid._id,
//         });
//         await newFriendInvitation.save();

//         //send pending invitation update to specific user

//         updateFriendsPendingInvitation(isUserValid._id.toString())


//         res.status(201).json({ message: "Invitation sent successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error in inviting friend", error });
//     }
// }


// export async function httpRejectInvitation(req,res){
//     try{
//         const {id} = req.body
//         const {userId} = req.user

//         // check if the id(user) of the invitation exists or not
//         const isInvitationExists = await ContactInvitation.findById(id)
//         if(!isInvitationExists){
//             return res.status(404).json({message:"Friend invitation doesnt exists"})
//         }
//         await ContactInvitation.findByIdAndDelete({_id:id})

//         //update pending invitations
//         updateFriendsPendingInvitation(userId)
//         res.status(200).json({message:"Invitation successfully rejected"})
//     }catch(error){
//         console.error(error);
//         res.status(500).json({ message: "Error in rejecting friend invitation", error });
//     }
// }


// // function to accept friend invitations
// export async function httpAcceptInvitation(req,res){
//     try{
//         const {id} = req.body
//         // const {userId} = req.user

//         // check wheither invitation exists or not
//         const isInvitationExists = await ContactInvitation.findById(id)
//         if(!isInvitationExists){
//             return res.status(404).json({message:"Friend invitation doesnt exists"})
//         }

//         const {senderId,receiverId} = isInvitationExists

//         // add friends to both user

//         const senderUser = await User.findById(senderId)       // for sender that is who wants to send invitation
//         senderUser.friends = [...senderUser.friends,receiverId]  // ...spreading because we want previous friends also and add new friend

//         const receiverUser = await User.findById(receiverId)    // for receiver that is whom we want to send invitation
//         receiverUser.friends = [...receiverUser.friends,senderId]  // ...spreading because we want previous friends also and add new friend

//         await senderUser.save()
//         await receiverUser.save()

//         //delete the invitation
//         await ContactInvitation.findByIdAndDelete(id)

//         //update list of friends if they are online
//         myFriends(senderId.toString())
//         myFriends(receiverId.toString())

//         //update list of friends pending invitation
//         updateFriendsPendingInvitation(receiverId.toString())

//         res.status(200).json({message:"Friend invitation accepted successfully"})
//     }catch(error){
//         console.error(error);
//         res.status(500).json({ message: "Error in accepting friend invitation", error });

//     }
// }

// Send Contact Invitation (Updated with Service Tracking)
export async function httpInviteFriend(req, res) {
    try {
        const { friendEmail, serviceId } = req.body; // Include serviceId in request
        const { userId } = req.user;

        // Check if the user exists
        const isUserValid = await User.findOne({ email: friendEmail });
        if (!isUserValid) {
            return res.status(404).json({ message: "That user does not exist" });
        }

        // Prevent self-invitation
        if (isUserValid._id.toString() === userId.toString()) {
            return res.status(401).json({ message: "You cannot invite yourself" });
        }

        // Check if an invitation is already sent
        const isInvitationAlreadyReceived = await ContactInvitation.findOne({
            senderId: userId,
            receiverId: isUserValid._id,
            serviceId // Ensure invitation is unique per service
        });
        if (isInvitationAlreadyReceived) {
            return res.status(409).json({ message: "Invitation is already sent for this service" });
        }

        // Check if they are already connected
        const isAlreadyFriend = isUserValid.Contacts.find(friendId =>
            friendId.toString() === userId.toString()
        );
        if (isAlreadyFriend) {
            return res.status(409).json({ message: "You are already connected" });
        }

        // Create a new contact invitation
        const newFriendInvitation = new ContactInvitation({
            senderId: userId,
            receiverId: isUserValid._id,
            serviceId, // Store the requested service
        });

        await newFriendInvitation.save();

        // Notify receiver of new invitation
        updateFriendsPendingInvitation(isUserValid._id.toString());

        res.status(201).json({ message: "Invitation sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in inviting friend", error });
    }
}

// Reject Contact Invitation
export async function httpRejectInvitation(req, res) {
    try {
        const { id } = req.body;
        const { userId } = req.user;

        // Check if the invitation exists
        const isInvitationExists = await ContactInvitation.findById(id);
        if (!isInvitationExists) {
            return res.status(404).json({ message: "Friend invitation does not exist" });
        }

        await ContactInvitation.findByIdAndDelete(id);

        // Update pending invitations
        updateFriendsPendingInvitation(userId);
        res.status(200).json({ message: "Invitation successfully rejected" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in rejecting friend invitation", error });
    }
}

// Accept Contact Invitation
export async function httpAcceptInvitation(req, res) {
    try {
        const { id } = req.body;

        // Check if invitation exists
        const isInvitationExists = await ContactInvitation.findById(id);
        if (!isInvitationExists) {
            return res.status(404).json({ message: "Friend invitation does not exist" });
        }

        const { senderId, receiverId } = isInvitationExists;

        // Add friends to both users
        const senderUser = await User.findById(senderId);
        senderUser.Contacts.push(receiverId);

        const receiverUser = await User.findById(receiverId);
        receiverUser.Contacts.push(senderId);

        await senderUser.save();
        await receiverUser.save();

        // Delete the invitation
        await ContactInvitation.findByIdAndDelete(id);

        // Update friends list and pending invitations
        myFriends(senderId.toString());
        myFriends(receiverId.toString());
        updateFriendsPendingInvitation(receiverId.toString());

        res.status(200).json({ message: "Friend invitation accepted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in accepting friend invitation", error });
    }
}


export const httpGetContactRequests = async (req, res) => {
    try {
        // const { freelancerId } = req.params;
        const { userId } = req.user
        console.log(userId)

        const contactRequests = await ContactInvitation.find({ receiverId: userId })
            .populate("senderId", "fullName avatar email") // Adjust field names
            .populate("serviceId", "title skills userId")

        console.log('contact requests: ', contactRequests)

        res.status(200).json(contactRequests);
    } catch (error) {
        console.error("Error fetching contact requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export async function httpGetClientAllRequests(req, res) {
    try {
        const { userId } = req.user

        const contactAllRequests = await ContactInvitation.find({ senderId: userId })
            .populate("serviceId", "title skills servicesAmount userId") // Populating service details
            .populate("receiverId", "fullName avatar email") // Adjust field names

        if (!contactAllRequests) return res.status(404).json({ message: 'Contact requests is empty' })

        console.log('All contact requests: ', contactAllRequests)

        res.status(200).json(contactAllRequests);

    } catch (error) {
        console.error("Error fetching contact requests:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}


