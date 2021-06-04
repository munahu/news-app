function Article(props) {
    console.log(props);
    return (
        <div>
            <img src={props.article.urlToImage} alt=""/>
            <p>{props.article.title}</p>
            <p>{props.article.description}</p>
        </div>   
    )
}

export default Article