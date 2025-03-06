import { useMutation } from "@tanstack/react-query";
import { editServicesDetails } from "../../services/apiServices";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useEditServices(){
    const {id} = useParams()
    const navigate = useNavigate()
    const {mutate:editServices,isLoading:editServicesLoading} = useMutation({
        mutationFn:(data)=>{
            return editServicesDetails(id,data)
        },
        onSuccess:()=>{
            toast.success("Successfully updated services")
            navigate('/my-services')
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })
    return {editServices,editServicesLoading}
}