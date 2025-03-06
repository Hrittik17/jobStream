import { useGetAllServices } from "./useGetAllServices";
import Loader from "../../ui/loader";
import ServiceCard from "./ServiceCard";
import BackButton from "../../ui/backButton";
import SearchBar from "./servicesSearchbar";

export default function ServicesLayout() {
    const { servicesLoading, servicesRefetch, Services } = useGetAllServices();

    if (servicesLoading) return <Loader />;

    return (
        <div className="container mx-auto p-6">
            <BackButton />
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Explore Services</h1>
            <SearchBar />

            {/* Services Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {Services.length > 0 ? (
                    Services.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full">No services found.</p>
                )}
            </div>
        </div>
    );
}
