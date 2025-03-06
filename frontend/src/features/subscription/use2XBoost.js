import { useMutation } from "@tanstack/react-query";
import { twoXBoost } from "../../services/apiSubscription";
import toast from "react-hot-toast";

export function use2XBoost(){
    const {mutate:twiceBoost,isLoading:twiceLoading} = useMutation({
        mutationFn:twoXBoost,
        onSuccess:()=>{
            toast.success("Successfully boosted you profile by 2X")
        },
        onError:(error)=>[
            toast.error(error.message)
        ]
    })
    return {twiceBoost,twiceLoading}
}