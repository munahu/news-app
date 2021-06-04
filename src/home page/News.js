import { useEffect, useState } from "react";
import useFetchData from "../useFetchData";
import LatestNews from "./LatestNews";
import FeaturedNews from "./FeaturedNews";
import TopArticle from "./TopArticle";

function News() {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const news = 
        useFetchData(`https://newsapi.org/v2/top-headlines?country=ca&apiKey=${apiKey}`);
        
    const [topArticle, setTopArticle] = useState({});
    const [featuredArticles, setFeaturedArticles] = useState([]);
    const [latestArticles, setLatestArticles] = useState([]);
    
    useEffect(() => {
        if (news.length > 0) {
            const cleanUp = () => {
                const articles = [];
                news.forEach(article => {
                    if (
                        article.urlToImage
                        && article.title
                        && article.description
                        && article.source.name
                        && article.content) {
                            articles.push(article);
                    };
                });
                articles.length = 12;
                setTopArticle(articles.splice(0, 1));
                setFeaturedArticles(articles.splice(0, 2));
                setLatestArticles(articles);
            }
            cleanUp();
        }
    }, [news])
    
    return (
        <div>
            <LatestNews articles={latestArticles}/>
            <TopArticle article={topArticle}/>
            <FeaturedNews articles={featuredArticles}/>
        </div>
    )
}

export default News