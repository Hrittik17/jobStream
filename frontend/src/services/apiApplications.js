import axios from "axios";

const Base_Url = 'http://localhost:8000/application'

export async function getAllUserApplicationsDetails(){
    try{
        const res = await axios.get(`${Base_Url}/all-users-applications`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error('dont found any applications',error.message)
        throw new Error(error)
    }
}

export async function getRecruiterApplicationsStats(){
    try{
        const res = await axios.get(`${Base_Url}/recruiter-applications-stats`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error('dont found any applications stats',error.message)
        throw new Error(error)
    }

}


export async function getRecruiterStats(){
    try{
        const res = await axios.get(`${Base_Url}/recruiter-stats`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error('dont found any recruiter stats',error.message)
        throw new Error(error)
    }
}


export async function getResumesCount(){
    try{
        const res = await axios.get(`${Base_Url}/resumes-count`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error(error)
        throw new Error(error)
    }
}

