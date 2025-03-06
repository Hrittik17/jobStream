import { RxDashboard } from "react-icons/rx";
import { MdOutlineAddChart } from "react-icons/md";
import { MdQueryStats } from "react-icons/md";
import { RiPhoneFindLine } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { GrSearch } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { SiFreelancer } from "react-icons/si";
import { GiSkills } from "react-icons/gi";
import { MdLeaderboard } from "react-icons/md";
import { MdOutlineLeaderboard } from "react-icons/md";
import { PiNewspaperClippingLight } from "react-icons/pi"
import { MdOutlineReportProblem } from "react-icons/md";
import Logo from "./logo";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import Loader from "./loader";

export default function SideNav() {
    const { currentUser, currentUserLoading, currentUserError } = useCurrentUser();

    // Show loader while data is being fetched
    if (currentUserLoading) {
        return <Loader />;
    }

    // Handle error state
    // if (currentUserError) {
    //     return <div>Error loading user data. Please try again.</div>;
    // }

    // If no currentUser (i.e., user is logged out), return null or a placeholder
    if (!currentUser) {
        return null; // Or display a message saying the user is logged out
    }

    // Define all links
    const links = [
        { path: '/dashboard', name: 'DashBoard', icon: <RxDashboard /> },
        { path: '/addJobs', name: 'Add Jobs', icon: <MdOutlineAddChart /> },
        { path: '/findJobs', name: 'Find Jobs', icon: <GrSearch /> },
        { path: '/stats', name: 'Stats', icon: <MdQueryStats /> },
        { path: '/subscription', name: 'Subscriptions', icon: <LiaMoneyBillWaveAltSolid /> },
        { path: '/postServices', name: 'Post Services', icon: <SiFreelancer /> },
        { path: '/all-services', name: 'Services', icon: < GiSkills/> },
        { path: '/leaderboard', name: 'leaderboard', icon: < MdOutlineLeaderboard/> },
        { path: '/news', name: 'News', icon: < PiNewspaperClippingLight/> },
    ];

    // Add Admin link only if user is an admin
    if (currentUser.role === 'admin') {
        links.push({ path: '/admin', name: 'Admin', icon: <MdAdminPanelSettings /> });
        links.push({ path: '/issues', name: 'Issues', icon: <MdOutlineReportProblem /> });
    }

    return (
        <aside className="bg-stone-100 py-10 px-4 border-r-4 border-stone-200 row-span-full flex flex-col space-y-4">
            <div className="mb-8">
                <Logo />
            </div>
            {currentUser ? (
                <ul className="flex flex-col space-y-3 overflow-scroll">
                    {links.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg hover:bg-stone-200 transition flex gap-2 ${isActive ? 'bg-stone-300 font-semibold' : 'text-stone-700'
                                    }`
                                }
                            >
                                <span className="text-2xl">{link.icon}</span>
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            ) : ""}
        </aside>
    );
}
