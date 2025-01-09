import axios from 'axios'

const Base_Url = 'http://localhost:8000'

export async function signUpNewUser(data) {
    try {
        const response = await axios.post(`${Base_Url}/auth/signup`, data);
        return response.data;
    } catch (error) {
        console.error("Sign Up Failed:", error.response?.data || error.message);
        throw new Error('Failed to sign up');
    }
}


export async function userLogin({email, password}) {
    try {
        const res = await axios.post(`${Base_Url}/auth/login`, { email, password },{ withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to login");
    }
}

export async function userChangePassword({email,password}){
    try{
        console.log(email,password)
        const res = await axios.patch(`${Base_Url}/user/change-password`,{email,password},{ withCredentials: true })
        return  res.data
    }catch(error){
        console.error('Failed to change the password',error)
        throw new Error(error.response?.data)
    }
}


export async function userLogout(){
    try{
        const res = await axios.get(`${Base_Url}/auth/logout`,{ withCredentials: true })
        return res.data;
    }catch(error){
        console.error('Failed to Logout',error)
        throw new Error(error.response?.data?.message)
    }
}


export async function getCurrentUser(){
    try{
        const res = await axios.get(`${Base_Url}/user/current-user`,{ withCredentials: true })
        return res.data
    }catch(error){
        console.error('Failed to get the current user',error)
    }
}


// export async function updateCurrentUserDetails(data){
//     try{
//         const res = await axios.patch(`${Base_Url}/user/update-user-details`,data,{ withCredentials: true})
//         return res.data
//     }catch(error){
//         console.error('Failed to update the user details',error)
//         throw new Error(error.response?.data?.message)
//     }
// }

export async function updateCurrentUserDetails(data) {
    try {
        const res = await axios.patch(`${Base_Url}/user/update-user-details`, data, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error('Failed to update the user details', error);
        throw new Error(error.response?.data?.message);
    }
}


export async function sendOTP(userEmail){
    try{
        console.log(userEmail)
        const res = await axios.post(`${Base_Url}/auth/send-otp`,{userEmail})
        return res.data
    }catch(error){
        console.error('Failed to send the confirmation code',error);
        throw new Error(error.response?.data?.message);
    }
}