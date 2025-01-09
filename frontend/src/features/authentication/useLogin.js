import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import toast from "react-hot-toast";


export function useLogin() {
    const navigate = useNavigate();
    const { mutate:Login, isLoading:loginLoading } = useMutation({
        mutationFn: ({email, password}) => {
            return userLogin({ email, password })
        },
        onSuccess: () => {
            console.log("User successfully logged in")
            navigate("/dashboard");
        },
        onError:(error)=>{
            console.error("Login Error:", error?.message?.data?.message);
        }
    })
    return { Login, loginLoading }
}
