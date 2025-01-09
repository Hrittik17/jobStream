export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
        <img
          src="not-found.png"
          alt="Not Found"
          className="w-72 mb-5"
        />
        <h1 className="text-xl font-semibold text-gray-700">No Data Found</h1>
      </div>
    );
  }
  