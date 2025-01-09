import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { deletedJob } from "../../services/apiJobs";

export function useDeleteJobs(){
    // const {id} = useParams()
    const queryClient = useQueryClient()
    const {mutate:deleteJobs,isLoading:deleteJobLoading} = useMutation({
        mutationFn:(id)=> deletedJob(id),
        onSuccess:()=>{
            queryClient.invalidateQueries()
            console.log("successfully deleted the job")
        },
        onError:(error)=>{
            console.error("Failed to delete the job",error)
        }
    })
    return {deleteJobs,deleteJobLoading}
}
