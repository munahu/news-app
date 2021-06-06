import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Article from "./Article";
import styles from "../styles/LatestNews.module.css";


function LatestNews(props) {
    
    const [topComponents, setTopComponents] = useState([]);
    const [bottomComponents, setBottomComponents] = useState([]);

    useEffect(() => {
        const top = props.articles.splice(0,5);
        const bottom = props.articles;
        
        const displayArticles = () => {
            const topComponents = top.map((article) => {
                return (
                    <Article
                        key={uuidv4()}
                        article={article}
                        articleClassName={styles.article}
                        imageContainerClassName={styles.imageContainer}
                        imageClassName={styles.image}
                        titleClassName={styles.title}
                        descriptionClassName={styles.description}
                        sourceClassName={styles.source} />
                )
            });

            setTopComponents(topComponents);
            
            const bottomComponents = bottom.map((article) => {
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
            
            setBottomComponents(bottomComponents);
        }
        
        displayArticles();

    }, [props.articles])
    
    if (window.screen.width < 1023) {
        return (
            <div className={styles.section}>
                {topComponents}
                {bottomComponents}
            </div>
        )
    } else {
        return (
            <>
                <div className={styles.section}>
                    <span className={styles.heading}>Latest News</span>
                    <div className={styles.articles}>
                        {topComponents}
                    </div>
                </div>
                <div className={styles.bottomSection}>
                    {bottomComponents}
                </div>
            </>
        )
    }
}

export default LatestNews