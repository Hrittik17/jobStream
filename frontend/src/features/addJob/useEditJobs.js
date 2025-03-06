import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { editJobs } from "../../services/apiJobs";
import toast from "react-hot-toast";

export function useEditJobs(){
    const {id} = useParams()
    const {mutate:editJob,isLoading:editJobLoading} = useMutation({
        mutationFn:(data)=> editJobs(id,data),
        onSuccess:()=>{
            toast.success('Successfully updated the job details')
            // console.log('Successfully updated the job details')
        },
        onError:(error)=>{
            toast.error('Failed to update the job details')
            console.error('Failed to update the job details',error)
        }
    })
    return {editJob,editJobLoading}
}