import axios from "axios";
const Base_Url = 'http://localhost:8000'

export async function twoXBoost() {
    try {
        const res = await axios.patch(`${Base_Url}/subscriptions/twoXBoost`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.error(error)
        throw new Error("error in 2xBoost", error)
    }
}

export async function fiveXBoost() {
    try {
        const res = await axios.patch(`${Base_Url}/subscriptions/fiveXBoost`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.error(error)
        throw new Error("error in 5xBoost", error)
    }
}

export async function tenXBoost() {
    try {
        const res = await axios.patch(`${Base_Url}/subscriptions/tenXBoost`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.error(error)
        throw new Error("error in 10xBoost", error)
    }
}



export const boostPoints = async (multiplier) => {
    try {

        const response = await axios.patch(`${Base_Url}/subscriptions/boost/${multiplier}`, {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error)
        throw new Error("error in boosting", error)
    }
};


export async function getUserSubscription() {
    try {
        const res = await axios.get(`${Base_Url}/subscriptions/user-subscription`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.error(error)
        throw new Error("error in fetching user subscription", error)
    }
}


export async function fetchUserSubscriptionStats() {
    try {
        const res = await axios.get(`${Base_Url}/subscriptions/user-subscription-stats`, { withCredentials: true });
        return res.data.stats;
    } catch (error) {
        console.error("Error fetching subscription stats:", error);
        throw new Error(error.message);
    }
}


export async function fetchAllSubscriptions(){
    try{
        const res = await axios.get(`${Base_Url}/subscriptions/all-subscriptions`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error("Error fetching all subscription:", error);
        throw new Error(error.message);
    }
}

export async function fetchAdminSubscriptionStats() {
    try {
        const res = await axios.get(`${Base_Url}/subscriptions/admin-subscriptions-stats`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error fetching subscription stats:", error);
        throw new Error(error.message);
    }
}
