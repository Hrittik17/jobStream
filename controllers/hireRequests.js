import HireRequest from "../models/hireRequests.js";
import ChatRoom from "../models/chatRoomModel.js"

export async function httpCreateHireRequests(req, res) {
    try {
        const { freelancerId, serviceId, additionalDetails, preferredDeadline, chatBeforeHiring } = req.body;

        if (!freelancerId || !serviceId) {
            return res.status(400).json({ message: "Freelancer ID and Service ID are required" });
        }

        const hireRequest = await HireRequest.create({
            clientId: req.user.userId, // Logged-in user
            freelancerId,
            serviceId,
            additionalDetails,
            preferredDeadline,
            chatBeforeHiring
        });

        res.status(201).json(hireRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export async function httpGetAllHireRequests(req, res) {
    try {
        const freelancerId = req.user.userId
        const hireRequests = await HireRequest.find({ freelancerId }).populate("clientId serviceId");
        res.status(200).json(hireRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function httpUpdateHireRequestStatus(req, res) {
    try {
        const { requestId, status } = req.body;

        if (!["Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // const updatedRequest = await HireRequest.findByIdAndUpdate(
        //     requestId,
        //     { status },
        //     { new: true }
        // );
        const hireRequest = await HireRequest.findById(requestId);
        if (!hireRequest) return res.status(404).json({ message: "Request not found" });


        if (status === "Accepted") {
            // Create a chat room if the request is accepted
            const chatRoom = await ChatRoom.create({
                members: [hireRequest.clientId, hireRequest.freelancerId],
                messages: []
            });

            hireRequest.chatRoomId = chatRoom._id;
        }

        hireRequest.status = status;
        await hireRequest.save();


        // if (!updatedRequest) {
        //     return res.status(404).json({ message: "Hire request not found" });
        // }

        res.status(200).json(hireRequest);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message });
    }
}


export async function httpGetClientServicesRequest(req, res) {
    try {
        const userId = req.user.userId

        const isServicesRequestsExists = await HireRequest.find({ clientId: userId }).populate("clientId serviceId freelancerId");
        if (!isServicesRequestsExists) {
            return res.status(404).json({ message: 'Service request doesnt exists' })
        }

        res.status(200).json(isServicesRequestsExists)
    } catch (error) {
        console.error(error)
        res.status(500).json(error.message);

    }
}


export async function httpGetOrCreateChatRoom(req, res) {
    try {
        const { clientId, freelancerId } = req.body;

        let chatRoom = await ChatRoom.findOne({
            members: { $all: [clientId, freelancerId] }
        });

        if (!chatRoom) {
            chatRoom = await ChatRoom.create({ members: [clientId, freelancerId], messages: [] });
        }

        res.status(200).json(chatRoom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function httpSendMessage(req, res) {
    try {
        const { chatRoomId, sender, text } = req.body;

        const chatRoom = await ChatRoom.findById(chatRoomId);
        if (!chatRoom) return res.status(404).json({ message: "Chat room not found" });

        const newMessage = { sender, text, timestamp: new Date() };
        chatRoom.messages.push(newMessage);
        await chatRoom.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
