import axios from "axios";

const Base_url = 'http://localhost:8000/services-contacts'

export async function inviteContactRequests(friendEmail,serviceId){
    try{
        const res = await axios.post(`${Base_url}/invite-contact-request`,{ friendEmail,serviceId },{withCredentials: true })
        return res.data
    }catch(error){
        console.error(error)
        throw new error("error in invite request:",error?.response?.data?.message)
    }
}

export async function acceptContactRequests(id){
    try{
        const res = await axios.post(`${Base_url}/accept-contact-request`, { id }, { withCredentials: true })
        return res.data
    } catch (error) {
        console.error(error)
        throw new Error("error in accept request:",error?.response?.data?.message)
    }
}


export async function rejectContactRequests(id){
    try {
        const res = await axios.post(`${Base_url}/reject-contact-request`, { id }, { withCredentials: true })
        return res.data
    } catch (error) {
        console.error(error)
        throw new Error("error in reject request:",error?.response?.data?.message)
    }
}


export async function getAllRequests(){
    try{
        const res = await axios.get(`${Base_url}/all-requests`,{ withCredentials: true })
        return res.data
    }catch(error){
        console.error(error)
        throw new Error('error in the get all requets: ',error?.response?.data?.message)
    }
}


export async function getClientAllRequests(){
    try{
        const res = await axios.get(`${Base_url}/client-all-requests`,{ withCredentials: true })
        return res.data
    }catch(error){
        console.error(error)
        throw new Error('error in the get client all requets: ',error)

    }
} 