import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <img
                src="undraw_page-not-found_6wni.png"
                alt="Page Not Found"
                className="max-w-2xl sm:max-w-sm lg:max-w-xl mb-6"
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Oops! Page Not Found
            </h1>
            <p className="text-gray-600 mb-6 text-center">
                We cannot seem to find the page you are looking for. 
                It might have been removed or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
            >
                Back to Home
            </Link>
        </div>
    );
}
