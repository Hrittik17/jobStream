// import { RxDashboard } from "react-icons/rx";
// import { MdOutlineAddChart } from "react-icons/md";
// import { MdQueryStats } from "react-icons/md";
// import { RiPhoneFindLine } from "react-icons/ri";
// import { MdAdminPanelSettings } from "react-icons/md";
// import { GrSearch } from "react-icons/gr";
// import { NavLink, } from "react-router-dom";
// import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
// import Logo from "./logo";
// import { useCurrentUser } from "../features/authentication/useCurrentUser";
// import Loader from "./loader";
// import { useEffect } from "react";

// export default function SideNav() {
//     const { currentUser, currentUserLoading } = useCurrentUser();

//     if (currentUserLoading) {
//         return <Loader />;
//     }
//     if(currentUser) return 

//     // Define all links
//     const links = [
//         { path: '/dashboard', name: 'DashBoard', icon: <RxDashboard /> },
//         { path: '/addJobs', name: 'Add Jobs', icon: <MdOutlineAddChart /> },
//         { path: '/findJobs', name: 'Find Jobs', icon: <GrSearch /> },
//         { path: '/stats', name: 'Stats', icon: <MdQueryStats /> },
//         { path: '/subscription', name: 'Subscriptions', icon: <LiaMoneyBillWaveAltSolid /> },
//     ];

//     // Add Admin link only if user is an admin
//     if (currentUser.role === 'admin') {
//         links.push({ path: '/admin', name: 'Admin', icon: <MdAdminPanelSettings /> });
//     }

//     return (
//         <aside className="bg-stone-100 py-10 px-4 border-r-4 border-stone-200 row-span-full flex flex-col space-y-4">
//             <div className="mb-8">
//                 <Logo />
//             </div>
//             <ul className="flex flex-col space-y-3">
//                 {links.map((link) => (
//                     <li key={link.path}>
//                         <NavLink
//                             to={link.path}
//                             className={({ isActive }) =>
//                                 `px-4 py-2 rounded-lg hover:bg-stone-200 transition flex gap-2 ${
//                                     isActive ? 'bg-stone-300 font-semibold' : 'text-stone-700'
//                                 }`
//                             }
//                         >
//                             <span className="text-2xl">{link.icon}</span>
//                             {link.name}
//                         </NavLink>
//                     </li>
//                 ))}
//             </ul>
//         </aside>
//     );
// }


import { RxDashboard } from "react-icons/rx";
import { MdOutlineAddChart } from "react-icons/md";
import { MdQueryStats } from "react-icons/md";
import { RiPhoneFindLine } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { GrSearch } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
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
    ];

    // Add Admin link only if user is an admin
    if (currentUser.role === 'admin') {
        links.push({ path: '/admin', name: 'Admin', icon: <MdAdminPanelSettings /> });
    }

    return (
        <aside className="bg-stone-100 py-10 px-4 border-r-4 border-stone-200 row-span-full flex flex-col space-y-4">
            <div className="mb-8">
                <Logo />
            </div>
            <ul className="flex flex-col space-y-3">
                {links.map((link) => (
                    <li key={link.path}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg hover:bg-stone-200 transition flex gap-2 ${
                                    isActive ? 'bg-stone-300 font-semibold' : 'text-stone-700'
                                }`
                            }
                        >
                            <span className="text-2xl">{link.icon}</span>
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
