import axios from "axios";

const Base_Url = 'http://localhost:8000/'

export async function getLeadersBoard(){
    try{
        const res = await axios.get(`${Base_Url}leaderboard`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error("error in leadersboard fetch",error)
        throw new Error(error)
    }
}