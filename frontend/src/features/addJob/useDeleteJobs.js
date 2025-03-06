import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { deletedJob } from "../../services/apiJobs";
import toast from "react-hot-toast";

export function useDeleteJobs(){
    // const {id} = useParams()
    const queryClient = useQueryClient()
    const {mutate:deleteJobs,isLoading:deleteJobLoading} = useMutation({
        mutationFn:(id)=> deletedJob(id),
        onSuccess:()=>{
            queryClient.invalidateQueries()
            toast.success("Successfully deleted the job")
            // console.log("successfully deleted the job")
        },
        onError:(error)=>{
            toast.error("Failed to delete the job")
            console.error("Failed to delete the job",error)
        }
    })
    return {deleteJobs,deleteJobLoading}
}
