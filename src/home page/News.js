import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useFetchData from "../useFetchData";
import Article from "./Article";

function News() {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const news = 
        useFetchData(`https://newsapi.org/v2/top-headlines?country=ca&apiKey=${apiKey}`);
        
    const [articles, setArticles] = useState([]);
    
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
                setArticles(articles);
            }
            cleanUp();
        }
    }, [news])
    
    const [articleComponents, setArticleComponents] = useState([]);
    
    useEffect(() => {
        const displayArticles = () => {
            const articleComponents = articles.map((article) => {
                return <Article key={uuidv4()} article={article} />;
            });
            
            setArticleComponents(articleComponents);
        }
        displayArticles();
        
    }, [articles])
    
    
    
    
    return (
        <div>
            {articleComponents}
        </div>
    )
}

export default News