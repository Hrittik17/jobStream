import { useFetchNews } from './useFetchNews'
import Loader from '../../ui/loader'
import ArticleCard from './articleCard'
import BackButton from '../../ui/backButton'

export default function Newslayout() {
    const { news, newsLoading, newsRefetch } = useFetchNews()
    if (newsLoading) return <Loader />
    console.log(news.articles)
    return (
        <>
            <BackButton />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-5xl font-bold mb-8">News</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {news.articles.filter((_, index) => index < 24).map((article) => {
                        return (
                            <ArticleCard key={article.id} article={article} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
