import express from "express"
import { getUserSubscriptionData, getUserSubscriptionStats, httpBoost, httpBoostFiveTimes, httpBoostTenTimes, httpBoostTwoTimes, httpGetAdminSubscriptionStats, httpGetAllSubscription } from "../controllers/subscriptionControllers.js"
const subscriptionRoutes = express.Router()

subscriptionRoutes.patch('/twoXBoost',httpBoostTwoTimes)
subscriptionRoutes.patch('/fiveXBoost',httpBoostFiveTimes)
subscriptionRoutes.patch('/10XBoost',httpBoostTenTimes)

subscriptionRoutes.patch('/boost/:multiplier', async (req, res) => {
    const multiplier = Number(req.params.multiplier);

    if (![2, 5, 10].includes(multiplier)) {
        return res.status(400).json({ message: 'Invalid multiplier' });
    }

    await httpBoost(req, res, multiplier);
});

subscriptionRoutes.get('/user-subscription',getUserSubscriptionData)

subscriptionRoutes.get('/user-subscription-stats', getUserSubscriptionStats);

subscriptionRoutes.get('/all-subscriptions',httpGetAllSubscription)
subscriptionRoutes.get('/admin-subscriptions-stats',httpGetAdminSubscriptionStats)



export default subscriptionRoutes