import { useState } from "react";
import Logo from "../../ui/logo";
import { Link } from "react-router-dom";
import { useLogin } from "./useLogin";

export default function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginLoading, Login } = useLogin();

    function handleLoginSubmit(event) {
        event.preventDefault();
        // console.log({email,password})
        if (!email || !password) return;

        Login(
            { email, password },
            {
                onSettled: () => {
                    setPassword("");
                    setEmail("");
                },
            }
        );
    }

    return (
        <>
            <Logo />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            Login to Your Account
                        </h2>
                    </div>
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                className="border-none rounded-md font-medium text-sm flex items-center gap-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                                onClick={() => {
                                    setEmail("");
                                    setPassword("");
                                }}
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="border-none rounded-md font-medium text-sm flex items-center gap-2 px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
                                disabled={loginLoading}
                            >
                                {loginLoading ? "Signing In..." : "Sign In"}
                            </button>
                        </div>

                        <div className="flex gap-4 justify-center items-center">
                            <div>
                                <Link to={'/forget-password'}>
                                    <span className="text-zinc-800">Forget Password?</span>
                                </Link>
                            </div>
                            <div>
                                <Link to={"/signUp"} className="text-blue-700">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
