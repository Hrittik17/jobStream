import mongoose from "mongoose";

const contactInvitationSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }, 
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services", // Links to the service being requested
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
},{timestamps:true})

export default mongoose.model("ContactInvitation",contactInvitationSchema)