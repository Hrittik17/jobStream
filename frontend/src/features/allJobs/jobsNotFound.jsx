export default function JobsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <img src="no job found.png" alt="No job found" className="w-160 h-80 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-700">No Job Post Found</h1>
    </div>
  );
}
