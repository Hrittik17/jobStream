import { useMutation } from "@tanstack/react-query";
import { createNewJob } from "../../services/apiJobs";

export function useAddJobs(){
    const {mutate:createJob,isLoading:jobCreationLoading,isError:jobCreationError} = useMutation({
        mutationFn:(data)=>createNewJob(data),
        onSuccess:()=>{
            console.log("Successfully created the job")
        },
        onError:(error)=>{
            console.error("Error creating the job",error.message)
        }
    })
    return {createJob,jobCreationLoading,jobCreationError}
}