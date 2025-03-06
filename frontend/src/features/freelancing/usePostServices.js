import { useMutation } from "@tanstack/react-query";
import { postServicesDetails } from "../../services/apiServices";
import toast from "react-hot-toast";

export function usePostServices(){
    const {mutate:postService,isLoading:postServiceLoading} = useMutation({
        mutationFn:(data)=>postServicesDetails(data),
        onSuccess:()=>{
            toast.success('Successfully created a service')
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })
    return {postService,postServiceLoading}
}