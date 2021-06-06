import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Article from "./Article";
import styles from "../styles/FeaturedNews.module.css";


function FeaturedNews(props) {
    const [articleComponents, setArticleComponents] = useState([]);

    useEffect(() => {
        const displayArticles = () => {
            const articleComponents = props.articles.map((article) => {
                return (
                  <Article
                    key={uuidv4()}
                    article={article}
                    articleClassName={styles.article}
                    imageContainerClassName={styles.imageContainer}
                    imageClassName={styles.image}
                    textContainer={styles.textContainer}
                    titleClassName={styles.title}
                    descriptionClassName={styles.description}
                    sourceClassName={styles.source}
                  />
                );
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

export default FeaturedNews