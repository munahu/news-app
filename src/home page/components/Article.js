function Article(props) {
    return (
      <div className={props.articleClassName}>
        <a
          className={props.imageContainerClassName}
          href={props.article.url}
          target="_blank" rel="noreferrer">
            <img
              className={props.imageClassName}
              src={props.article.image}
              alt={props.article.title}
            />
        </a>
        <div className={props.textContainer}>
          <a 
            className={props.titleClassName}
            href={props.article.url}
            target="_blank"
            rel="noreferrer">
            {props.article.title}
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