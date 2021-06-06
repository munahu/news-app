function Article(props) {
    return (
      <div className={props.articleClassName}>
        <a href={props.article.url} target="_blank" className={props.imageContainer}>
          <img
            className={props.imageClassName}
            src={props.article.urlToImage}
            alt={props.article.title}
          />
        </a>
        <div>
          <a href={props.article.url} target="_blank">
            <p className={props.titleClassName}>{props.article.title}</p>
          </a>
          <p className={props.descriptionClassName}>
            {props.article.description}
          </p>
          <span className={props.sourceClassName}>{props.article.source}</span>
        </div>
      </div>
    );
} 

export default Article