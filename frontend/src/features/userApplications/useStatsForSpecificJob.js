import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { statsForSpecificJobApplication } from "../../services/apiUser";

export function useStatsForSpecificApplication() {
    const { id } = useParams();  // Ensure the ID is available
    console.log(id)
    const { data: applicationStats, isLoading: applicationStatsLoading, refetch: applicationStatsRefetch } = useQuery({
        queryKey: ['applicationStats', id],  // Make sure the queryKey matches
        queryFn: () => statsForSpecificJobApplication(id), // Use correct function
    });

    return { applicationStats, applicationStatsLoading, applicationStatsRefetch };
}
