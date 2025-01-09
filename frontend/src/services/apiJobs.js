import axios from "axios";
import { data } from "react-router-dom";

const Base_Url = 'http://localhost:8000'

export async function createNewJob(data) {
    try {
        const res = await axios.post(`${Base_Url}/jobs`, data, { withCredentials: true })
        return res.data
    } catch (err) {
        console.error('failed to create job', err)
        throw new Error(err.response?.data?.message)
    }
}

export async function getAllJobs() {
    try {
        const res = await axios.get(`${Base_Url}/jobs/all-jobs`, { withCredentials: true })
        return res.data
    } catch (err) {
        console.error('failed to get jobs', err)
        throw new Error(err.response?.data?.message)
    }
}

// export async function getAllJobsPosts({request}){
//     console.log(request.url)
//     const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
//     console.log(params)

//     try{
//         const res = await axios.get(`${Base_Url}/all-jobs`,{
//             params
//         },{ withCredentials: true })
//         return res.data
//     }catch(error){
//         console.error('failed to get all jobs posts')
//         throw new Error(error.response?.data?.message)       
//     }
// }

export async function getAllJobsPosts(params) {
    try {
        const res = await axios.get(`${Base_Url}/all-jobs`, { params, withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Failed to get all jobs posts", error);
        throw new Error(error.response?.data?.message || "Failed to fetch jobs");
    }
}


export async function getJobDetails(id) {
    if (!id) {
        throw new Error('Invalid Job ID');
    }
    try {
        const res = await axios.get(`${Base_Url}/jobs/${id}`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error('Failed to get job details', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
}

export async function editJobs(id, data) {
    try {
        const res = await axios.patch(`${Base_Url}/jobs/${id}`, data, { withCredentials: true });
        return res.data
    } catch (error) {
        // console.error('Failed to edit the job', error)
        throw new Error(error.response?.data?.message || error.message);
    }
}

// export async function deletedJob(id) {
//     try {
//         const res = await axios.delete(`${Base_Url}/jobs/${id}`, { withCredentials: true });
//         return res.data
//     } catch (error) {
//         // console.error('Failed to delete the job', error)
//         throw new Error(error.response?.data?.message || error.message);
//     }
// }

export async function deletedJob(id) {
    try {
        const res = await axios.delete(`${Base_Url}/jobs/${id}`, { withCredentials: true });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to delete the job");
    }
}


export async function getJobsStats() {
    try {
        const response = await axios.get(`${Base_Url}/jobs/stats`, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error('failed to get jobs stats', error)
        throw new Error(error.response?.data?.message || "Failed to get the job stats");
    }
}

export async function getAllJobPostDetails(id) {
    if (!id) {
        throw new Error('Invalid Job ID');
    }
    try {
        const res = await axios.get(`${Base_Url}/all-jobs/${id}`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error('Failed to get job details', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
}

// export async function postApplyJob(id,data) {
//     try {
//         const res = await axios.post(`${Base_Url}/${id}/apply`, data, { withCredentials: true })
//         return res.data;
//     } catch (error) {
//         console.error('Failed to apply for the job', error)
//         throw new Error(error.response?.data?.message || error.message)
//     }
// }

export async function postApplyJob(id, formData) {
    try {
        console.log('id=', id,'form-data=', formData);
        const res = await axios.post(`${Base_Url}/jobs/${id}/apply`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        console.error("Failed to apply for the job", error);
        throw new Error(error.response?.data?.message || error.message);
    }
}