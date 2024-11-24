import Link from 'next/link';
import '../stylesheets/ArticleCard.css';

const ArticleCard = ( props ) => {
  const article = props.article;
  const articleID = props.id
  return (
    <div className="article-card">
      <h2 className="card-title">{article.title}</h2>
      <p>{article.description}</p>
      <p className="card-author">
        <span>Author:</span> {article.author}
      </p>
      <Link href={`/articles/${encodeURIComponent(articleID)}`} className="link">
        Read more
      </Link>
    </div>
  );
};

export default ArticleCard;
