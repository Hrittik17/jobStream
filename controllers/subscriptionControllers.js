import mongoose from "mongoose"
import Services from "../models/servicesModel.js"
import User from "../models/userModel.js"
import Subscriptions from "../models/userSubscriptionModel.js"


export async function httpBoostTwoTimes(req, res) {
    try {
        console.log(req.cookies)
        // console.log("userId",req.user.userId)
        // const subscribedBy = req.user.userId
        // const plan = 
        // const subscriptionData = {amount,plan,subscribedBy}

        // }
        const isUserExists = await User.findById({ _id: req.user.userId })
        if (!isUserExists) return res.status(404).json({ message: "User does not exist" })

        isUserExists.points = 10 * 2
        await isUserExists.save()

        res.status(200).json({ message: "Successfully boost two times" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to boost", error })
    }
}

export async function httpBoostFiveTimes(req, res) {
    try {
        const isUserExists = await User.findById({ _id: req.user.userId })
        if (!isUserExists) return res.status(404).json({ message: "User does not exist" })

        isUserExists.points = 10 * 5
        await isUserExists.save()

        res.status(200).json({ message: "Successfully boost five times" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to boost", error })
    }
}

export async function httpBoostTenTimes(req, res) {
    try {
        const isUserExists = await User.findById({ _id: req.user.userId })
        if (!isUserExists) return res.status(404).json({ message: "User does not exist" })

        isUserExists.points = 10 * 10
        await isUserExists.save()

        res.status(200).json({ message: "Successfully boost ten times" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to boost", error })
    }
}


export async function httpBoost(req, res, multiplier) {
    try {
        const userId = req.user.userId;
        if(req.user.role === 'admin'){
            return res.status(401).json({message:'Admin is not allowed to boost'})
        }
        const user = await User.findById(userId);
        let amount = 0
        // const amount = multiplier === 2 ? 9.99 ? multiplier === 5 ? 19.99 : 49.99 : 0
        if (multiplier === 2) amount = 9.99
        else if (multiplier === 5) amount = 19.99
        else amount = 49.99

        const subscribedBy = userId
        const subscriptionPlan = multiplier + "X boost"

        const subscriptionData = { amount, subscriptionPlan, subscribedBy }


        if (!user) return res.status(404).json({ message: 'User does not exist' });

        user.points = (user.points || 0) * multiplier;
        const usersSubscriptions = await Subscriptions.create(subscriptionData)
        if (!usersSubscriptions) {
            return res.status(401).json({ message: "Failed to create subscription" })
        }
        await user.save();
        res.status(200).json({ message: `Successfully boosted by ${multiplier}x`, points: user.points });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to boost', error });
    }
}


export async function getUserSubscriptionData(req, res) {
    try {
        const { userId } = req.user; // Assuming middleware populates req.user
        const subscriptions = await Subscriptions.find({ subscribedBy: userId });

        if (!subscriptions || subscriptions.length === 0) {
            return res.status(404).json({ message: 'No subscription plans found for this user' });
        }

        res.status(200).json({ message: "Subscription plans retrieved successfully", subscriptions });
    } catch (error) {
        console.error("Error in getUserSubscriptionData:", error);
        res.status(500).json({ message: 'Failed to fetch subscription data', error: error.message });
    }
}


export async function getUserSubscriptionStats(req, res) {
    try {
        const { userId } = req.user;

        // Aggregate subscriptions by month
        const subscriptionStats = await Subscriptions.aggregate([
            { $match: { subscribedBy: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } }, // Sort by month
        ]);

        // Map month numbers to names
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
        ];
        const formattedStats = subscriptionStats.map((stat) => ({
            month: months[stat._id - 1],
            count: stat.count,
        }));

        res.status(200).json({ message: "Subscription stats retrieved", stats: formattedStats });
    } catch (error) {
        console.error("Error in getUserSubscriptionStats:", error);
        res.status(500).json({ message: "Failed to fetch subscription stats", error: error.message });
    }
}


export async function httpGetAllSubscription(req, res) {
    try {
        const { role } = req.user

        if (role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized to access this" });
        }

        // const allSubscriptions = await Subscriptions.find({})
        // if(!allSubscriptions){
        //     return res.status(404).json({message:'There is no subscription available'})
        // }
        const allSubscriptions = await Subscriptions.find({})
            .populate({
                path: 'subscribedBy',
                select: 'fullName email gender status avatar' // Select only required fields
            });

        if (!allSubscriptions.length) {
            return res.status(404).json({ message: 'There is no subscription available' });
        }

        // const totalEarnings = allSubscriptions.reduce((total, subscription) => total + subscription.amount,0)
        //  Calculate total earnings correctly
        const totalEarnings = allSubscriptions.reduce((total, subscription) => total + subscription.amount, 0);


        res.status(200).json({allSubscriptions,totalEarnings})

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to fetch subscription", error: error.message });

    }
}


export async function httpGetAdminSubscriptionStats(req, res) {
    try {
        const { role } = req.user;

        if (role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized to access this" });
        }

        const subscriptionStats = await Subscriptions.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } } // Sort by month
        ]);

        res.status(200).json(subscriptionStats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch subscription stats", error: error.message });
    }
}

