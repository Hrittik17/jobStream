import mongoose from "mongoose";

const userSubscriptionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    subscriptionPlan: {
        type: String,
        required: true,
    },
    subscribedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
    { timestamps: true }
)

export default mongoose.model('Subscriptions',userSubscriptionSchema) 