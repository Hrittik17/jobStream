export default function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Oops! Something went wrong.
                </h1>
                <p className="text-gray-700 mb-4">
                    {error.message || "An unexpected error occurred."}
                </p>

                <div className="flex flex-col items-center gap-3">
                    <button
                        onClick={resetErrorBoundary}
                        className="border-none rounded-md font-medium text-sm px-5 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                    >
                        Try Again
                    </button>
                    <span className="text-xs text-gray-500">
                        Error Code: 500
                    </span>
                </div>
            </div>
        </div>
    );
}
