import axios from "axios";

const Base_Url = 'http://localhost:8000'

export async function getAllIssues(){
    try{
        const res = await axios.get(`${Base_Url}/issue`,{ withCredentials: true })
        return res.data
    }catch(error){
        console.error('failed to get the issues',error)
        throw new error(error)
    }
}

export async function postRaisedIssue(issueData){
    try{
        console.log('data of raised issue: ',issueData)
        const res = await axios.post(`${Base_Url}/issue/raise-issue`,{issueData},{ withCredentials: true })
        return res.data
    }catch(error){
        console.error('failed to raise the issues',error)
        throw new error(error)
    }
}