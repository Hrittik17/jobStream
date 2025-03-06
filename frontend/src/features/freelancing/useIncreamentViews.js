import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementServiceViews } from "../../services/apiServices";

export function useIncrementViews(){
    const queryClient = useQueryClient();
    const {mutate: incrementViews} = useMutation({
        mutationFn:(id)=>{
            return incrementServiceViews(id)
        },
        onSuccess: (id) => {
            // Invalidate service details query to reflect updated views
            queryClient.invalidateQueries(["serviceDetails", id]);
        },
        onError: (error) => {
            console.error("Failed to increment views:", error);
        },
    })
    return {incrementViews}
}