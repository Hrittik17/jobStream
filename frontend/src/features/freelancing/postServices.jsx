import { useForm } from 'react-hook-form';
import BackButton from '../../ui/backButton';
import { usePostServices } from './usePostServices';
import { useCurrentUser } from '../authentication/useCurrentUser';

const PostService = () => {
    const { postService, postServiceLoading } = usePostServices();
    const { currentUser, currentUserLoading } = useCurrentUser();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Check if currentUser is loading or not available
    if (currentUserLoading) {
        return <div>Loading...</div>; // Or show a spinner
    }

    if (!currentUser) {
        return <div>User not logged in</div>;
    }

    const onSubmit = async (data) => {
        const serviceData = {
            title: data.title,
            description: data.description,
            skills: data.skills,
            servicesAmount: data.servicesAmount,
            userId: currentUser._id, // Use the current user's _id
            projectLink: data.projectLink
        };
        console.log(serviceData)
        postService(serviceData, {
            onSuccess: () => {
                reset()
            }
        })
    };

    return (
        <>
            <BackButton />
            <div className="w-full max-w-5xl bg-slate-100 p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Post a Service</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title Field */}
                    <div>
                        <label htmlFor="title" className="block text-xl font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            {...register('title', { required: 'Title is required' })}
                            className={`mt-2 p-3 w-full border border-gray-300 rounded-md ${errors.title ? 'border-red-500' : ''}`}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Description Field */}
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            {...register('description', { required: 'Description is required' })}
                            className={`mt-2 p-3 w-full border border-gray-300 rounded-md ${errors.description ? 'border-red-500' : ''}`}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Category Field */}
                    <div>
                        <label htmlFor="skills" className="block text-xl font-medium text-gray-700">Skills</label>
                        <input
                            type="text"
                            id="skills"
                            {...register('skills', { required: 'Title is required' })}
                            className={`mt-2 p-3 w-full border border-gray-300 rounded-md ${errors.skills ? 'border-red-500' : ''}`}
                        />
                        {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
                    </div>

                    {/* Amount Field */}
                    <div>
                        <label htmlFor="servicesAmount" className="block text-lg font-medium text-gray-700">Min Amount</label>
                        <input
                            type="number"
                            id="servicesAmount"
                            {...register('servicesAmount', { required: 'Min amount is required' })}
                            className={`mt-2 p-3 border border-gray-300 rounded-md ${errors.servicesAmount ? 'border-red-500' : ''}`}
                        />
                        {errors.servicesAmount && <p className="text-red-500 text-sm">{errors.servicesAmount.message}</p>}
                    </div>

                    {/* Project Link Field */}
                    <div>
                        <label htmlFor="projectLink" className="block text-lg font-medium text-gray-700">Project Link</label>
                        <textarea
                            id="projectLink"
                            {...register('projectLink', { required: 'Project link is required' })}
                            className={`mt-2 p-3 w-full border border-gray-300 rounded-md ${errors.projectLink ? 'border-red-500' : ''}`}
                        />
                        {errors.projectLink && <p className="text-red-500 text-sm">{errors.projectLink.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="my-8 flex justify-end">
                        <button
                            type="submit"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            disabled={postServiceLoading} // Disable button while loading
                        >
                            {postServiceLoading ? 'Posting...' : 'Post Service'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PostService;
