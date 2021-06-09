import { useEffect, useState } from "react";
import useFetchData from "../../useFetchData";
import LatestNews from "./LatestNews";
import FeaturedNews from "./FeaturedNews";
import TopArticle from "./TopArticle";
import styles from "../styles/News.module.css";

function News() {    
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const news = 
        useFetchData(`https://gnews.io/api/v4/top-headlines?country=us&token=${apiKey}`);
        
    const [topArticle, setTopArticle] = useState({});
    const [featuredArticles, setFeaturedArticles] = useState([]);
    const [latestArticles, setLatestArticles] = useState([]);
    
    useEffect(() => {
        if (news.length > 0) {
            const cleanUp = () => {
                const articles = [];
                news.forEach(article => {
                    article.source = article.source.name;
                    if (
                        article.image
                        && article.title
                        && article.description
                        && article.source) {
                            articles.push(article);
                    };
                });
                localStorage.setItem("news", JSON.stringify(articles));
                setTopArticle(articles.splice(0, 1)[0]);
                setFeaturedArticles(articles.splice(0, 2));
                setLatestArticles(articles);
            }
            cleanUp();
        }
    }, [news])
    
    return (
        <div className={styles.news}>
            <LatestNews articles={latestArticles}/>
            <FeaturedNews articles={featuredArticles}/>
            <TopArticle article={topArticle}/>
        </div>
    )
}

export default News