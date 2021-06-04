function Article(props) {
    return (
        <div>
            <img src={props.article.urlToImage} alt={props.article.title}/>
            <p>{props.article.title}</p>
            <p>{props.article.description}</p>
        </div>
    )
}

export default Article