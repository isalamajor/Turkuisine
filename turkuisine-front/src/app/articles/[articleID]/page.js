"use client";
import { useEffect, useState } from 'react';
import { getArticleById, getPicture } from '../../services/api'; 
import { useParams } from 'next/navigation';
import Link from "next/link";
import '../../stylesheets/ArticlePage.css';
import Margin from '@/app/components/Margin';
import axios from 'axios';


const ArticlePage = () => {
  const [article, setArticle] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [imageUrl, setImageUrl] = useState(null); 

  const { articleID } = useParams();  
  const id = decodeURIComponent(articleID);
  const API_URL = 'http://localhost:3090/api';


  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true); // Inicia la carga
        try {
          // Obtener artículo y luego la imagen asociada
          const data = await getArticleById(id);
          setArticle(data);

          if (data.picture) {
          const response = await axios.get(`${API_URL}/articlePictures/${articleID}`, {
            responseType: 'blob', 
          });
          
          // Crea una URL a partir del blob recibido
          const imageBlobUrl = URL.createObjectURL(response.data);
          setImageUrl(imageBlobUrl);
        }

        } catch (err) {
          setError('Error loading article or image. Please try again later.');
        } finally {
          setLoading(false); // Finaliza la carga
        }
      };

      fetchData();
    }
  }, [id]); // Ejecuta cuando cambie el ID del artículo

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  

  return (
    <div className='main-container'>
      <Margin />
      <div className="article-container">
        <Link href='/'>
          <img src='/img/logo2.png' alt='logo' className='logo' />
        </Link>
        <div className='article'>
          {article ? (
            <>
              <h1>{article.title}</h1>
              <p>{article.content}</p>
              {imageUrl && <img src={imageUrl} alt='picture' className='article-pic' />} {/* Muestra la imagen si existe */}
              <p className='article-author'><strong>Author:</strong> {article.author}</p>
              <p className='article-date'>Published day {article.published_date.slice(0,10)}</p> {/* Toma solo la fecha, no el resto (hora, etc)*/}
            </>
          ) : (
            <p>Article not found.</p> 
          )}
        </div>
      </div>
      <Margin />
    </div>
  );
};

export default ArticlePage;
