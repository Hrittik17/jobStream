import axios from "axios";
const Base_Url = 'http://localhost:8000'

export async function getUserApplications(){
    try{
        const res = await axios.get(`${Base_Url}/user/my-applications`,{ withCredentials: true })
        return res.data
    }catch(error){
        console.error('user application error',error)
        throw new error(error)
    }
}

// export async function getAllJobApplications(_id){
//     try{
//         console.log(_id)
//         const res = await axios.get(`${Base_Url}/jobs/${_id}/all-applications`,{ withCredentials: true })
//         return res.data
//     }catch(error){
//         console.error('Job application error',error)
//         throw new Error(error)
//     }
// }

export async function getAllJobApplications(jobId) {
    try {
        console.log(jobId);
        const res = await axios.get(`${Base_Url}/jobs/${jobId}/all-applications`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error('Job application error:', error);
        throw error; // Throw the error to handle it in the hook
    }
}



// for the stats of the user on how many jobs he applied in a month
export async function getUserApplicationsStats() {
    try {
        const res = await axios.get(`${Base_Url}/user/my-applications/stats`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error('Error fetching application stats', error);
        throw new Error(error);
    }
}

export async function acceptResume(_id,email){
    try{
        console.log(_id, email)
        const res = await axios.patch(`${Base_Url}/jobs/${_id}/all-applications/accept`,{_id,email},{withCredentials: true});
        return res.data
    }catch(error){
        console.error("accept resume error",error.message)
        throw new Error(error);
    }
}
export async function pendingResume(_id,email){
    try{
        console.log(_id, email)
        const res = await axios.patch(`${Base_Url}/jobs/${_id}/all-applications/pending`,{_id,email},{withCredentials: true});
        return res.data
    }catch(error){
        console.error("pending resume error",error.message)
        throw new Error(error);
    }
}
export async function rejectResume(_id,email){
    try{
        console.log(_id, email)
        const res = await axios.patch(`${Base_Url}/jobs/${_id}/all-applications/reject`,{_id,email},{withCredentials: true});
        return res.data
    }catch(error){
        console.error("reject resume error",error.message)
        throw new Error(error);
    }
}


export async function userMontlyApplication(){
    try{
        const res = await axios.get(`${Base_Url}/user/my-applications/montly-applications`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error('failed to get montly application',error)
        throw new Error(error)
    }
}

export async function statsForSpecificJobApplication(id){
    try{
        const res = await axios.get(`${Base_Url}/jobs/${id}/stats`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error('failed to get montly  job application',error)
        throw new Error(error)
    }
}