import { useNavigate } from "react-router-dom";

export default function DataNotFound({ title }) {
  const navigate = useNavigate()
  return (
    <>
    <div>
      <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" 
      onClick={()=>navigate(-1)}>&larr; back</button>
    </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
        <img src="no job found.png" alt="No job found" className="w-160 h-80 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700">No {title} Post Found</h1>
      </div>
    </>
  );
}
