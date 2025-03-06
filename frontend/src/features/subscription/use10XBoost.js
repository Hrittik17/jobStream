import { useMutation } from "@tanstack/react-query";
import { tenXBoost } from "../../services/apiSubscription";
import toast from "react-hot-toast";

export function use10XBoost(){
    const {mutate:tenBoost,isLoading:tenLoading} = useMutation({
        mutationFn:tenXBoost,
        onSuccess:()=>{
            toast.success("Successfully boosted you profile by 10X")
        },
        onError:(error)=>[
            toast.error(error.message)
        ]
    })
    return {tenBoost,tenLoading}
}