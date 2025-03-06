import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { deleteServices } from "../../services/apiServices";
import toast from "react-hot-toast";

export function useDeleteServices(){
    const queryClient = useQueryClient()
    const {mutate:deleteUserServices,isLoading:deleteServicesLoading} = useMutation({
        mutationFn:(id)=>{
            return deleteServices(id)
        },
        onSuccess:()=>{
            toast.success("Successfully deleted services")
            queryClient.invalidateQueries(["userServices"])
        }
    })
    return {deleteUserServices,deleteServicesLoading}
}