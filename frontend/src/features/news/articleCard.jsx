export default function ArticleCard({ article }) {

    return (
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block no-underline"> {/* Added link here */}
            <div className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-200"> {/* Added hover effect */}
                <img
                    className="w-full h-48 object-cover"
                    src={article.urlToImage}
                    alt={article.title}
                    onError={(e) => {
                        e.target.onerror = null; // prevents infinite loop
                        e.target.src = "https://via.placeholder.com/300"; // sets a placeholder
                    }}
                />
                <div className="px-4 py-2">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition duration-200">{article.title}</h3> {/* Hover effect on title */}
                    <p className="text-gray-700 line-clamp-3">{article.description}</p>
                    <div className="flex items-center mt-4">
                        <span className="text-gray-500 text-sm mr-2">
                            {article.author ? `by ${article.author}` : 'By Unknown Author'}
                        </span>
                        <span className="text-gray-500 text-sm">
                            {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </a>
    )

}