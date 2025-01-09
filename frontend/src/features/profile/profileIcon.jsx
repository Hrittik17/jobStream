import { useContext, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { SettingContext } from "../../context/settingContext";
import ProfileDropdownItems from "./profileDropdownItems";

export default function ProfileIcon() {
    const { isProfileIconOpen, setIsProfileIconOpen } = useContext(SettingContext);
    const dropdownRef = useRef(null);

    // Toggle dropdown visibility
    const toggleProfileIcon = (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up
        setIsProfileIconOpen(!isProfileIconOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileIconOpen(false); // Close dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsProfileIconOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Icon */}
            <button
                onClick={toggleProfileIcon}
                className="p-2 text-2xl hover:bg-gray-100 rounded-full transition-all duration-200"
            >
                <CgProfile />
            </button>

            {/* Dropdown Menu */}
            {isProfileIconOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-200 z-50">
                    <ProfileDropdownItems />
                </div>
            )}
        </div>
    );
}
