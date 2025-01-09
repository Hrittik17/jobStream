
export default function SettingsDropdownItems() {

    return (
        <ul className="flex flex-col divide-y divide-gray-200 text-sm">
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">Dark Mode</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 flex gap-4">Help</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 flex gap-4">Raise Issue</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 flex gap-4">Contact Us</button>
                </li>
        </ul>
    )
}
