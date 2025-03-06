import { useMutation } from "@tanstack/react-query";
import { postRaisedIssue } from "../../services/apiIssues";
import toast from "react-hot-toast";

export function useRaisedIssues(){
    const {mutate:RaiseIssue,isLoading:raiseIssueLoading,isError:raiseIssueError} = useMutation({
        mutationFn:async (issueData) => {
            console.log("Data inside mutation: ", issueData);
            return await postRaisedIssue(issueData); // Added await
        },
        onSuccess:()=>{
            toast.success('Sucessfully raised an issue')
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {RaiseIssue,raiseIssueLoading,raiseIssueError}
}