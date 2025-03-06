import { useMutation } from "@tanstack/react-query";
import { fiveXBoost } from "../../services/apiSubscription";
import toast from "react-hot-toast";

export function use5XBoost(){
    const {mutate:fiveBoost,isLoading:fiveLoading} = useMutation({
        mutationFn:fiveXBoost,
        onSuccess:()=>{
            toast.success("Successfully boosted you profile by 5X")
        },
        onError:(error)=>[
            toast.error(error.message)
        ]
    })
    return {fiveBoost,fiveLoading}
}