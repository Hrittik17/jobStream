import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import BackButton from "../../ui/backButton";

export default function ContactUs() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        // Handle form submission (send data to backend or email service)
    };

    return (
        <>
            <BackButton />
            <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">

                <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Contact Info */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="text-blue-600 text-xl" />
                                <p className="text-gray-700">support@jobstream.com</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaPhoneAlt className="text-green-600 text-xl" />
                                <p className="text-gray-700">+1 234 567 890</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaMapMarkerAlt className="text-red-600 text-xl" />
                                <p className="text-gray-700">123 Job Street, Tech City, USA</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-semibold">Full Name</label>
                                <input
                                    type="text"
                                    {...register("fullName", { required: "Full Name is required" })}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
                                    placeholder="Enter your name"
                                />
                                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold">Email</label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold">Message</label>
                                <textarea
                                    {...register("message", { required: "Message cannot be empty" })}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none h-28"
                                    placeholder="Write your message here..."
                                />
                                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
