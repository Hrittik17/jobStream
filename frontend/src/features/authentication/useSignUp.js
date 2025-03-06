import { useMutation } from '@tanstack/react-query';
import { signUpNewUser } from '/src/services/apiAuth.js'; // Ensure correct import path
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useSignUp() {
    const navigate = useNavigate();
    const { mutate: signUp, isLoading: signUpLoading } = useMutation({
        mutationFn: (data) => signUpNewUser(data),
        onSuccess: () => {
            toast.success("User successfully created. Please login ")
            navigate('/login');
        },
        onError: (err) => {
            console.error("Error during sign-up:", err.message);
            toast.error('Sign-up failed, please try again',err?.message?.data)
        },
    });

    return { signUp, signUpLoading };
}
