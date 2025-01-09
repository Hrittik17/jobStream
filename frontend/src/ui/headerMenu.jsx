import { CiDark } from "react-icons/ci";
import SettingIcon from "../features/settings/settingIcon";
import ProfileIcon from "../features/profile/profileIcon";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import { useLogOut } from "../features/authentication/useLogout";
import Loader from "./loader";
import UserAvatar from "./userAvatar";

export default function HeaderMenu() {
   const { LogOut, logOutLoading } = useLogOut();
   const { currentUser, currentUserLoading, currentUserError } = useCurrentUser();

   if(!currentUser) return

   if (currentUserLoading) return <Loader/>

   if (currentUserError) {
      return <div>Error: {currentUserError.message}</div>;
   }

   return (
      <div className="flex justify-between items-center p-4 bg-white text-black shadow-md border-b">
         <div className="flex items-center gap-4">
            <div>
               <UserAvatar/>
               
            </div>
            {
               currentUser ? ( <span className="font-bold text-lg">{currentUser?.fullName || "Guest"}</span>) : ''
            }
            {
               currentUser ? (<span className="text-sm text-gray-600">{currentUser.status}</span>):''
            }
         </div>

         <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-200 rounded-full transition duration-300">
               <SettingIcon className="text-xl" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full transition duration-300">
               <ProfileIcon className="text-xl" />
            </button>
            {
               currentUser ? (
                  <button
                     className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md font-medium text-sm hover:bg-blue-500 hover:text-white transition-all duration-300"
                     onClick={LogOut}
                     disabled={logOutLoading}>
                     {logOutLoading ? 'Logging out...' : 'Logout'}
                  </button>
               ) : ''
            }
         </div>
      </div>
   );
}


