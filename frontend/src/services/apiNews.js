import axios from "axios";

const news_Api='https://newsapi.org/v2/everything?q=tesla&from=2024-12-23&sortBy=publishedAt&apiKey=7e2a0088cc4d4dfe93a8c6e0b5529036'

export async function getNewsData(){
    try{
        const res = await axios.get(news_Api)
        return res.data
    }catch(error){
        console.error(error)
        throw new Error("error in fetching news",error)
    }
}

