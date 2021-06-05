import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Article from "./Article";
import styles from "./styles/LatestNews.module.css";


function LatestNews(props) {
    // console.log(props);
    const [articleComponents, setArticleComponents] = useState([]);
    
    useEffect(() => {
        const displayArticles = () => {
            const articleComponents = props.articles.map((article) => {
                return (
                    <Article 
                        key={uuidv4()}
                        article={article}
                        articleClassName={styles.article}
                        imgClassName={styles.image}
                        titleClassName={styles.title}
                        descriptionClassName={styles.description}
                        sourceClassName={styles.source} />
                )
            });

            setArticleComponents(articleComponents);
        }
        displayArticles();

    }, [props.articles])
    
    return (
        <div className={styles.section}>
            {articleComponents}
        </div>
    )
    
}

export default LatestNews