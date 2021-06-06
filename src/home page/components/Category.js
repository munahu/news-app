import { useEffect, useState } from "react";
import useFetchData from "../../useFetchData";
import LatestNews from "./LatestNews";
import FeaturedNews from "./FeaturedNews";
import TopArticle from "./TopArticle";
import styles from "../styles/News.module.css";

function Category(props) {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const news = useFetchData(
    `https://newsapi.org/v2/top-headlines?country=us&category=${props.match.params.id}&apiKey=${apiKey}`
  );

  const [topArticle, setTopArticle] = useState({});
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);

  useEffect(() => {
    if (news.length > 0) {
      const cleanUp = () => {
        const articles = [];
        news.forEach(article => {
          article.title = removeSourceFromTitle(article);
          article.source = article.source.name;
          if (
            article.urlToImage &&
            article.title &&
            article.description &&
            article.source &&
            article.content
          ) {
            articles.push(article);
          }
        });
        articles.length = 12;
        setTopArticle(articles.splice(0, 1)[0]);
        setFeaturedArticles(articles.splice(0, 2));
        setLatestArticles(articles);
      };
      cleanUp();
    }
  }, [news]);

  const removeSourceFromTitle = article => {
    const title = article.title.split(" - ")[0];
    return title;
  };

  return (
    <div className={styles.news}>
        <LatestNews articles={latestArticles} />
        <FeaturedNews articles={featuredArticles} />
        <TopArticle article={topArticle} />
    </div>
  );
}

export default Category;
