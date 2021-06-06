import { useEffect, useState } from "react";
import Article from "./Article";
import styles from "../styles/TopArticle.module.css";


function TopArticle(props) {
    const [articleComponent, setArticleComponent] = useState();
    
    useEffect(() => {
        const articleComponent = (
          <Article
            article={props.article}
            articleClassName={styles.article}
            imageContainerClassName={styles.imgContainer}
            imageClassName={styles.image}
            textContainer={styles.textContainer}
            titleClassName={styles.title}
            descriptionClassName={styles.description}
            sourceClassName={styles.source}
          />
        );
        setArticleComponent(articleComponent);
    }, [props.article])
    
    return (
        <div className={styles.section}>
            {articleComponent}
        </div>
    )
}

export default TopArticle