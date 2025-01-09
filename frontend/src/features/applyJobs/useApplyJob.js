// import { useMutation } from "@tanstack/react-query";
// import { postApplyJob } from "../../services/apiJobs";
// import { useNavigate, useParams } from "react-router-dom";

// export function useApplyJob(){
//     const navigate = useNavigate()
//     const {id} = useParams()
//     const {mutate:ApplyJob,isLoading:jobApplyLoading} = useMutation({
//         mutationFn:(data)=>{
//             return postApplyJob(id,data)
//         },
//         onSuccess:()=>{
//             console.log('Successfully applied for the job')
//             navigate('/findJobs')
//         },
//         onError: (error) => {
//             console.error('Failed to apply for the job:', error.response?.data?.message || error.message);
//         }
        
//     })
//     return {ApplyJob,jobApplyLoading}
// }


import { useMutation } from "@tanstack/react-query";
import { postApplyJob } from "../../services/apiJobs";
import { useNavigate, useParams } from "react-router-dom";

export function useApplyJob() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { mutate: ApplyJob, isLoading: jobApplyLoading } = useMutation({
        mutationFn: (formData) => postApplyJob(id, formData), // Accept formData directly
        onSuccess: () => {
            console.log("Successfully applied for the job");
            // navigate("/findJobs");
        },
        onError: (error) => {
            // console.error("Failed to apply for the job:", error.response?.data?.message || error.message);
            console.error("Failed to apply for the job", error);
        },
    });

    return { ApplyJob, jobApplyLoading };
}
