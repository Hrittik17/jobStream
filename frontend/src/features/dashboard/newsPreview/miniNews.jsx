import Loader from "../../../ui/loader";
import { useFetchNews } from "../../news/useFetchNews";

export default function MiniNews({ numberOfArticles = 5 }) { // Added prop for number of articles
    const { news, newsLoading } = useFetchNews()

    if (newsLoading) return <Loader />

    if (!news || !news.articles || news.articles.length === 0) {
        return <div className="text-gray-500 text-center py-4">No news available.</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Latest News</h2>
            <ul className="divide-y divide-gray-200">
                {news.articles.slice(0, numberOfArticles).map((article) => (
                    <li key={article.url} className="py-2">
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm line-clamp-1" // Smaller text, underline on hover, line clamp
                        >
                            {article.title}
                        </a>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-1">{article.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}