import axios from "axios";
const Base_Url = 'http://localhost:8000'

export async function postServicesDetails(serviceData){
    try{
        console.log(serviceData)
        const res = await axios.post(`${Base_Url}/services/post-services`,{serviceData},{withCredentials:true})
        return res.data
    }catch(error){
        console.error('failed to post the services',error)
        throw new error(error)
    }
}

export async function getAllServices(){
    try{
        const res = await axios.get(`${Base_Url}/services/all-services`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error("Failed to get services",error)
    }
}

export async function editServicesDetails(id,data){
    try{
        const res = await axios.patch(`${Base_Url}/services/${id}/update-services-details`,{data},{withCredentials:true})
        return res.data
    }catch(error){
        console.error("Failed to update services",error)
        throw new Error(error)
    }
}


export async function deleteServices(id){
    try{
        const res = await axios.delete(`${Base_Url}/services/${id}/delete-services`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error("Failed to delete services",error)
        throw new Error(error)
    }
}


export async function getServiceDetails(id){
    try{
        const res = await axios.get(`${Base_Url}/services/${id}`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error("Failed to get services details",error)
        throw new Error(error)
    }
}

export async function getUserServices(){
    try{
        const res = await axios.get(`${Base_Url}/services/user-services`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error("Failed to get services of user",error)
        throw new Error(error)
    }
}


export const incrementServiceViews = async (id) => {
    try{

        const { data } = await axios.patch(`${Base_Url}/services/${id}/views`,{withCredentials:true});
        return data;
    }catch(error){
        console.error("Failed to increment views of services",error)
        throw new Error(error)
    }
};


export const createHireRequest = async (hireData) => {
    try{
        const response = await axios.post(`${Base_Url}/hireFreelancers`, hireData, {
            withCredentials: true,
        });
        return response.data;
    }catch(error){
        console.error("Failed to create hire requests",error)
        throw new Error(error)
    }
};


export async function getHireFreelancers(){
    try{
        const res = await axios.get(`${Base_Url}/hireFreelancers/get-hireFreelancer`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error("Failed to get hire requests",error)
        throw new Error(error)
    }
}


export async function updateHireFreelancersStatus({ requestId, status }){
    try{
        const res = await axios.patch(`${Base_Url}/hireFreelancers/update-status`,{ requestId, status },{withCredentials:true})
        return res.data
    }catch(error){
        console.error("Failed to update the status of hire requests",error)
        throw new Error(error)
    }
}


export async function getClientServicesRequests(){
    try{
        const res = await axios.get(`${Base_Url}/hireFreelancers/get-hireFreelancer/client`,{withCredentials:true})
        return res.data
    }catch(error){
        console.error(error)
        throw new Error(error.message)
    }
}
