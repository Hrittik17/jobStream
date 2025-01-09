import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { editJobs } from "../../services/apiJobs";

export function useEditJobs(){
    const {id} = useParams()
    const {mutate:editJob,isLoading:editJobLoading} = useMutation({
        mutationFn:(data)=> editJobs(id,data),
        onSuccess:()=>{
            console.log('Successfully updated the job details')
        },
        onError:(error)=>{
            console.error('Failed to update the job details',error)
        }
    })
    return {editJob,editJobLoading}
}