import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Article from "./Article";


function LatestNews(props) {
    const [articleComponents, setArticleComponents] = useState([]);
    
    useEffect(() => {
        const displayArticles = () => {
            const articleComponents = props.articles.map((article) => {
                return <Article key={uuidv4()} article={article} />;
            });

            setArticleComponents(articleComponents);
        }
        displayArticles();

    }, [props.articles])
    
    return articleComponents;
    
}

export default LatestNews