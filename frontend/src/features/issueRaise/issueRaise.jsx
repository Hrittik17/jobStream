import React from 'react';
import { useForm } from "react-hook-form";
import { useCurrentUser } from '../authentication/useCurrentUser';
import Loader from '../../ui/loader';
import NotFound from '../../ui/notFound';
import { useRaisedIssues } from './useRaisedIssues';

export default function IssueRaise() {
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm();
    const {RaiseIssue,raiseIssueLoading} = useRaisedIssues()

    const { currentUser, currentUserLoading, currentUserError } = useCurrentUser();

    if (currentUserLoading) return <Loader />;
    if (currentUserError) return <NotFound />;

    function handleRaiseIssue(data) {
        console.log(data);
        const issueData = {email:currentUser?.email,issue:data.issue}
        if (!issueData.email) {
            console.error("Email is missing in request");
            return;
        }
    
        RaiseIssue(issueData,{
            onSuccess:()=>{
                reset()
            }
        })
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Raise an Issue</h2>
            <form onSubmit={handleSubmit(handleRaiseIssue)} className="space-y-5">
                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        defaultValue={currentUser?.email}
                        disabled
                        className="w-full mt-1 px-3 py-2 border border-gray-300 bg-gray-100 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // {...register("email", { required: "email is required" })}
                    />
                </div>

                {/* Issue Textarea */}
                <div>
                    <label htmlFor="issue" className="block text-sm font-medium text-gray-700">
                        Issue
                    </label>
                    <textarea
                        {...register("issue", { required: "Issue is required" })}
                        placeholder="What issue are you facing?"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.issue && <p className="text-red-500 text-sm">{errors.issue.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                    // onClick={}
                    disabled={raiseIssueLoading}
                >
                    Submit Issue
                </button>
            </form>
        </div>
    );
}
