import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useLogOut } from "../authentication/useLogout";

export default function ProfileDropdownItems() {
    const navigate = useNavigate();
    const { currentUser } = useCurrentUser()
    const { LogOut, logOutLoading } = useLogOut();

    function handleNavigationForLogin() {
        navigate('/login');
    }

    return (
        <ul className="flex flex-col divide-y divide-gray-200 text-sm">
            <li>
                <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => navigate('/my-jobs')}>My Jobs</button>
            </li>
            {currentUser.status === "recruiter" && currentUser?.role === 'admin' &&
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200" onClick={() => navigate('/my-applications')}>My Applications</button>
                </li>
            }

            {currentUser?.status === 'recruiter' && (
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200" onClick={() => navigate('/all-resumes')}>All Resumes</button>
                </li>
            )}
            <li>
                <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => navigate('/profile')}>My Profile</button>
            </li>

            <li>
                <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => navigate('/my-services')}>My Services</button>
            </li>

            <li>
                <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => navigate('/my-requests')}>My Requests</button>
            </li>

            <li>
                <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200" onClick={() => navigate('/my-subscription')}>My Subscription</button>
            </li>
            <li>
                <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200" onClick={() => navigate('/profile/change-password')}>Change Password</button>
            </li>
            <li>
                {
                    currentUser ? (
                        <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                            onClick={LogOut}>Logout</button>) : (
                        <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                            onClick={handleNavigationForLogin}>Login</button>
                    )
                }
            </li>
        </ul>
    )
}
