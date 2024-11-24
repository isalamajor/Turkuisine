"use client";
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import { getArticles, searchArticles   } from './services/api';
import ArticleCard from './components/ArticleCard';
import Margin from "./components/Margin";



const Home = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchArticles(query);
    console.log("results: " + results);
    setArticles(results); // Actualiza el estado de los artículos
  };
  
  return (
    <div className={styles.appcontainer}>
      <Margin/>
      <div className={styles.blogcontainer}>
        <a href='/'><img src='/img/logo2.png' alt='logo' className={styles.logo}></img></a>
				<form onSubmit={handleSearch} className='form'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles"
          className='search-input'
        />
        <button type="submit" className='search-btn'>Search</button>
        </form>
				<div className={styles.articles}>
					{articles.length ? (
						articles.map((article) => <ArticleCard key={article._id} article={article} id={article._id} />)
					) : (
						<p>No articles found</p>
					)}
				</div>
        <div className={styles.catcontainer}>
        < img src='/img/cat-8915.gif' alt='cat' className={styles.cat}></img>
        </div>
        <p></p>
			</div>
      <Margin/>
    </div>
  );
};

export default Home;
