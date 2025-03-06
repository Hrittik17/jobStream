import { useMutation } from "@tanstack/react-query";
import { postApplyJob } from "../../services/apiJobs";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useApplyJob() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { mutate: ApplyJob, isLoading: jobApplyLoading } = useMutation({
        mutationFn: (formData) => postApplyJob(id, formData), // Accept formData directly
        onSuccess: () => {
            toast.success('Successfully applied for the job')
            // console.log("Successfully applied for the job");
            navigate("/findJobs");
        },
        onError: (error) => {
            toast.error("Failed to apply for the job")
            // console.error("Failed to apply for the job:", error.response?.data?.message || error.message);
            console.error("Failed to apply for the job", error);
        },
    });

    return { ApplyJob, jobApplyLoading };
}
