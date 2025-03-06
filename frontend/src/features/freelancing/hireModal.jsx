// import { useState } from "react";

// export default function HireModal({ isOpen, onClose, onConfirm }) {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Hiring</h2>
//                 <p className="text-sm text-gray-600 mb-4">
//                     Do you want to proceed with hiring this freelancer? You can discuss details before finalizing.
//                 </p>
//                 <div className="flex justify-end space-x-3">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={onConfirm}
//                         className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
//                     >
//                         Proceed
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";
import { useHireRequests } from "./useHireRequests";

export default function HireModal({ isOpen, onClose, freelancerId, serviceId, serviceTitle }) {
    const [additionalDetails, setAdditionalDetails] = useState("");
    const [preferredDeadline, setPreferredDeadline] = useState("");
    const [chatBeforeHiring, setChatBeforeHiring] = useState(false);

    const {HireRequest,hireRequestLoading,hireRequestError} = useHireRequests()

    const handleHire = () => {
        // You can later implement API integration here.
        HireRequest({
            freelancerId,
            serviceId,
            additionalDetails,
            preferredDeadline,
            chatBeforeHiring,
        },{
            onSuccess:()=>onClose()
        })
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Hire Freelancer</h2>

                        {/* Service Title */}
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700">Service</label>
                            <input 
                                type="text" 
                                value={serviceTitle} 
                                disabled 
                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                            />
                        </div>

                        {/* Additional Details */}
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700">Additional Requests</label>
                            <textarea 
                                className="w-full p-2 border border-gray-300 rounded-md"
                                rows="3"
                                placeholder="Specify any additional requirements..."
                                value={additionalDetails}
                                onChange={(e) => setAdditionalDetails(e.target.value)}
                            ></textarea>
                        </div>

                        {/* Preferred Deadline */}
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700">Preferred Deadline</label>
                            <input 
                                type="date" 
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={preferredDeadline}
                                onChange={(e) => setPreferredDeadline(e.target.value)}
                            />
                        </div>

                        {/* Chat Before Hiring */}
                        <div className="mb-4 flex items-center">
                            <input 
                                type="checkbox" 
                                id="chatBeforeHiring"
                                checked={chatBeforeHiring}
                                onChange={() => setChatBeforeHiring(!chatBeforeHiring)}
                                className="mr-2"
                            />
                            <label htmlFor="chatBeforeHiring" className="text-sm text-gray-700">
                                Chat with Freelancer before hiring
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3">
                            <button 
                                onClick={onClose} 
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleHire} 
                                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                            >
                                Confirm Hire
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
