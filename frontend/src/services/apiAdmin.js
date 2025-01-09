import axios from "axios";

const Base_Url = 'http://localhost:8000'

export async function getAdminData() {
    try{
        const res = await axios.get(`${Base_Url}/user/admin/app-status`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error('Failed to get the admin status')
        throw new Error(error.response?.data?.message)
    }
    
}