import { use10XBoost } from "../features/subscription/use10XBoost";
import { use2XBoost } from "../features/subscription/use2XBoost";
import { use5XBoost } from "../features/subscription/use5XBoost";
import { useBoostPoints } from "../features/subscription/useBoost";
import BackButton from "./backButton";

const SubscriptionPlans = () => {
    const { twiceBoost, twiceLoading } = use2XBoost();
    const { fiveBoost, fiveLoading } = use5XBoost();
    const { tenBoost, tenLoading } = use10XBoost();


    const plans = [
        {
            id: 1,
            multiplier: 2,
            name: "2X Boost",
            price: "$9.99",
            description: "Get double the exposure for your gigs and job posts. Perfect for beginners looking to stand out!",
            features: [
                "2X visibility on services listings",
                "Priority support",
                "Basic analytics"
            ],
        },
        {
            id: 2,
            multiplier: 5,
            name: "5X Boost",
            price: "$19.99",
            description: "Boost your gigs fivefold and reach a wider audience. Ideal for professionals aiming for rapid growth.",
            features: [
                "5X visibility on services listings",
                "Premium support",
                "Advanced analytics",
                "Featured profile badge"
            ],
        },
        {
            id: 3,
            multiplier: 10,
            name: "10X Boost",
            price: "$49.99",
            description: "Dominate the leaderboard and become the top choice for recruiters. Designed for power users.",
            features: [
                "10X visibility on services listings",
                "Dedicated account manager",
                "Comprehensive analytics",
                "Top placement on search results",
                "Exclusive premium badge"
            ],
        }
    ];

    const { Boost, boostLoading } = useBoostPoints();

    return (
        <>
            <BackButton />
            <div className="bg-gray-100 py-12">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <h2 className="text-4xl italic font-bold text-center text-gray-800 mb-8">Choose Your Boost Plan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
                            >
                                <h3 className="text-2xl font-semibold text-gray-700 mb-4">{plan.name}</h3>
                                <p className="text-xl font-bold text-gray-800 mb-4">{plan.price}</p>
                                <p className="text-gray-600 mb-6">{plan.description}</p>
                                <ul className="text-left mb-6">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="text-gray-700 flex items-center mb-2">
                                            <svg
                                                className="w-5 h-5 text-green-500 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition ${
                                        plan.isLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                    onClick={()=>Boost(plan.multiplier)}
                                    disabled={boostLoading}
                                >
                                    { boostLoading ? "Processing..." : "Select Plan"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubscriptionPlans;
