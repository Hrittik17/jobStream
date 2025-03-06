// import { useContext, useEffect, useRef } from "react";
// import { SettingContext } from "../../context/settingContext";
// // import { CiSettings } from "react-icons/ci";
// // import SettingsDropdownItems from "./settingsDropdownItems";
// import { MdNotificationsNone } from "react-icons/md";
// import AllContactsRequests from "./allContactsRequests";

// export default function NotificationIcon() {
//     const { isNotificationOpen,setIsNotificationOpen } = useContext(SettingContext);
//     const notificationDropDownRef = useRef(null)

//     useEffect(() => {
//         function handleNotificationOutsideClick(event) {
//             if (notificationDropDownRef.current && !notificationDropDownRef.current.contains(event.target)) {
//                 setIsNotificationOpen(false)
//             }
//         }

//         // Add event listener on mount
//         document.addEventListener('mousedown', handleNotificationOutsideClick);

//         // Cleanup event listener on unmount or when dependency changes
//         return () => {
//             document.removeEventListener('mousedown', handleNotificationOutsideClick);
//         };
//     }, [setIsNotificationOpen]); // Ensure to add the function dependency here

//     // Toggle dropdown visibility
//     const toggleNotificationIcon = (event) => {
//         event.stopPropagation(); // Prevent the click event from bubbling up
//         setIsNotificationOpen(!isNotificationOpen);
//     }

//     return (
//         <div className="relative" ref={notificationDropDownRef}>
//             {/* Settings Icon */}
//             <button
//                 onClick={toggleNotificationIcon}
//                 className="p-2 text-2xl hover:bg-gray-200 rounded-full"
//             >
//                 <MdNotificationsNone size={30}/>
//             </button>

//             {/* Dropdown Menu */}
//             {isNotificationOpen && (
//                 <div className="absolute right-0 top-10 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
//                     <AllContactsRequests/>
//                 </div>
//             )}
//         </div>
//     );
// }


import { useContext, useEffect, useRef } from "react";
import { SettingContext } from "../../context/settingContext";
import { MdNotificationsNone } from "react-icons/md";
import AllContactsRequestsList from "./allContactsRequests";
import { useAllContactsRequests } from "./useAllContactRequests"; // Import your API hook

export default function NotificationIcon() {
    const { isNotificationOpen, setIsNotificationOpen } = useContext(SettingContext);
    const notificationDropDownRef = useRef(null);

    const { AllContactsRequests } = useAllContactsRequests(); // Fetch all requests
    const pendingRequests = AllContactsRequests?.length || 0; // Count of requests

    useEffect(() => {
        function handleNotificationOutsideClick(event) {
            if (notificationDropDownRef.current && !notificationDropDownRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        }

        document.addEventListener('mousedown', handleNotificationOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleNotificationOutsideClick);
        };
    }, [setIsNotificationOpen]);

    const toggleNotificationIcon = (event) => {
        event.stopPropagation();
        setIsNotificationOpen(!isNotificationOpen);
    };

    return (
        <div className="relative" ref={notificationDropDownRef}>
            {/* Notification Icon with Count */}
            <button
                onClick={toggleNotificationIcon}
                className="relative p-2 text-2xl hover:bg-gray-200 rounded-full"
            >
                <MdNotificationsNone size={30} />
                {pendingRequests > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {pendingRequests}
                    </span>
                )}
            </button>

            {/* Dropdown Menu */}
            {isNotificationOpen && (
                <div className="absolute right-0 top-10 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                    <AllContactsRequestsList />
                </div>
            )}
        </div>
    );
}
