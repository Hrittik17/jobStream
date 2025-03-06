import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import Loader from "./loader";
import toast from "react-hot-toast";

export default function HomeLayout() {
    const navigate = useNavigate();
    const { currentUser, currentUserLoading } = useCurrentUser()

    if (currentUserLoading) {
        return <Loader />
    }

    return (
        <div className="flex items-center justify-between min-h-screen bg-gray-50 px-8 md:px-16">
            {/* Left Content */}
            <div className="max-w-lg">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                    Job <span className="text-teal-500">Tracking</span> App
                </h1>
                <p className="text-gray-600 text-xl mb-8 leading-relaxed">
                    Discover your dream job with our innovative job hunt platform. Connect with top MNCs, showcase your skills, and apply effortlessly—all in one place. Your next career opportunity is just a click away!
                </p>

                {/* Subheading */}
                <h2 className="text-3xl md:text-3xl font-semibold text-gray-700 mb-8 text-center">
                    Your skills, their opportunities—let’s connect
                </h2>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                    {!currentUser ? (
                        <>

                            <button
                                className="bg-teal-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-teal-600 transition"
                                onClick={() => navigate('/signUp')}
                            >
                                Register
                            </button>
                            <button
                                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                        </>
                    ) : ''}
                </div>
            </div>

            {/* Right Image */}
            <div className="hidden md:block">
                <img
                    src="undraw_engineering-team_13ax.png"
                    alt="Job Hunt Illustration"
                    className="w-[30rem] h-auto"
                />
            </div>
        </div>
    );
}
