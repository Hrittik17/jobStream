
import { useMutation } from '@tanstack/react-query';
import { boostPoints } from '../../services/apiSubscription';
import { toast } from 'react-hot-toast';

// export const useBoostPoints = (multiplier) => {
//     return useMutation(() => boostPoints(multiplier), {
//         onSuccess: (data) => {
//             toast.success(data.message);
//         },
//         onError: (error) => {
//             toast.error(error.response?.data?.message || 'Failed to boost points');
//         },
//     });
// };

export function useBoostPoints(){
    const {mutate:Boost,isLoading:boostLoading} = useMutation({
        mutationFn:(multiplier)=> boostPoints(multiplier),
        onSuccess:(data)=>{
            toast.success(data.message)
        },
        onError:(error)=>{
            toast.error(error.response?.data?.message || 'Failed to boost points');
        }
    })
    return {Boost,boostLoading}
}