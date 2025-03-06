// import mongoose from "mongoose";

// const hireRequestSchema = new mongoose.Schema({
//     clientId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     freelancerId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     serviceId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Services',
//         required: true
//     },
//     additionalDetails: {
//         type: String
//     },
//     preferredDeadline: {
//         type: Date
//     },
//     chatBeforeHiring: {
//         type: Boolean,
//         default: false
//     },
//     status: {
//         type: String,
//         enum: ['Pending', 'Accepted', 'Rejected'],
//         default: 'Pending'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// export default mongoose.model('HireRequest', hireRequestSchema);


import mongoose from "mongoose";

const hireRequestSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
        required: true
    },
    additionalDetails: String,
    preferredDeadline: Date,
    chatBeforeHiring: Boolean,
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    },
    chatRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("HireRequest", hireRequestSchema);
