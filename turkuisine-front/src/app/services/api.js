import axios from 'axios';
const API_URL = 'http://localhost:3090/api';

export const getArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles`);
    console.log("Responde of getArticles: " + response);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/articles/${id}`);
    return response.data.article;
  } catch (error) {
    console.error(`Error fetching article with id ${id}:`, error);
    return null;
  }
};

export const searchArticles = async (search) => {
  try {
    if (!search || search === '') {
      const response = await axios.get(`${API_URL}/articles`);
      return response.data.articles;
    }
    const response = await axios.get(`${API_URL}/searcher/${search}`);
    return response.data.articles;
  } catch (error) {
      console.error(`Error searching articles:`, error);
      return [];
  }
};



