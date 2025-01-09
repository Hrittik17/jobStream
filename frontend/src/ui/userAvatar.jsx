import { useCurrentUser } from "../features/authentication/useCurrentUser";

function UserAvatar() {
    const { currentUser, currentUserLoading } = useCurrentUser(); // Ensure loading state is handled
  
    if (currentUserLoading) {
        return (
            <div className="flex items-center gap-4 font-medium text-sm text-gray-600 animate-pulse">
                <div className="w-14 h-14 rounded-full bg-gray-200"></div>
                <span className="w-24 bg-gray-200 h-5 rounded-md"></span>
            </div>
        );
    }
  
    if (!currentUser) {
        return (
            <div className="flex items-center gap-4 font-medium text-sm text-gray-600">
                <img
                    src="default_user.jpg" // Default fallback image
                    alt="Default Avatar"
                    className="block w-14 h-14 rounded-full object-cover object-center border-2 border-gray-100 shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
                />
                <span className="truncate text-gray-600 text-md">Guest</span>
            </div>
        );
    }
  
    const { avatar } = currentUser;
  
    return (
        <div className="flex items-center gap-4 font-medium text-sm text-gray-600">
            <img
                src={avatar || 'default_user.jpg'}
                alt={'User Avatar'}
                className="block w-14 h-14 rounded-full object-cover object-center border-2 border-gray-100 shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
            />
        </div>
    );
}

export default UserAvatar;
