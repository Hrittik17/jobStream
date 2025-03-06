import { useMutation } from "@tanstack/react-query";
import { createNewJob } from "../../services/apiJobs";
import toast from "react-hot-toast";

export function useAddJobs(){
    const {mutate:createJob,isLoading:jobCreationLoading,isError:jobCreationError} = useMutation({
        mutationFn:(data)=>createNewJob(data),
        onSuccess:()=>{
            toast.success("Successfully created the job")
            // console.log("Successfully created the job")
        },
        onError:(error)=>{
            toast.error("Failed to create a job")
            console.error("Error creating the job",error.message)
        }
    })
    return {createJob,jobCreationLoading,jobCreationError}
}