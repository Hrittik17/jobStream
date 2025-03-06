import { useQuery } from "@tanstack/react-query";
import { getAllJobApplications } from "../../services/apiUser";
import { useParams } from "react-router-dom";

export function useAllJobApplications() {
    const { id } = useParams(); // Use 'id' to match route variable
    const { data, isLoading, isError,refetch } = useQuery({
        queryKey: ['All-Applications', id],
        queryFn: () => getAllJobApplications(id), // Pass function reference
    });
    return { data, isLoading, isError,refetch };
}
