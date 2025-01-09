import { useContext, useEffect, useRef } from "react";
import { SettingContext } from "../../context/settingContext";
import { CiSettings } from "react-icons/ci";
import SettingsDropdownItems from "./settingsDropdownItems";

export default function SettingIcon() {
    const { isSettingIconOpen, setIsSettingIconOpen } = useContext(SettingContext);
    const settingDropDownRef = useRef(null)

    useEffect(() => {
        function handleSettingOutsideClick(event) {
            if (settingDropDownRef.current && !settingDropDownRef.current.contains(event.target)) {
                setIsSettingIconOpen(false)
            }
        }

        // Add event listener on mount
        document.addEventListener('mousedown', handleSettingOutsideClick);

        // Cleanup event listener on unmount or when dependency changes
        return () => {
            document.removeEventListener('mousedown', handleSettingOutsideClick);
        };
    }, [setIsSettingIconOpen]); // Ensure to add the function dependency here

    // Toggle dropdown visibility
    const toggleSettingIcon = (event) => {
        event.stopPropagation(); // Prevent the click event from bubbling up
        setIsSettingIconOpen(!isSettingIconOpen);
    }

    return (
        <div className="relative" ref={settingDropDownRef}>
            {/* Settings Icon */}
            <button
                onClick={toggleSettingIcon}
                className="p-2 text-2xl hover:bg-gray-200 rounded-full"
            >
                <CiSettings />
            </button>

            {/* Dropdown Menu */}
            {isSettingIconOpen && (
                <div className="absolute right-0 top-10 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                    <SettingsDropdownItems />
                </div>
            )}
        </div>
    );
}
