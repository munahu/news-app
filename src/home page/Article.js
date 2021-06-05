function Article(props) {
    return (
        <div className={props.articleClassName}>
            <img
                className={props.imgClassName}
                src={props.article.urlToImage}
                alt={props.article.title}/>
            <div>
                <p className={props.titleClassName}>{props.article.title}</p>
                <p className={props.descriptionClassName}>{props.article.description}</p>
                <span className={props.sourceClassName}>{props.article.source}</span>
            </div>
        </div>
    )
} 

export default Article