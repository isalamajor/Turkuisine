import { useState } from 'react';
import { searchArticles } from '../services/api';
import '../stylesheets/SearchBar.css';

const SearchBar = ({ setArticles }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchArticles(query);
    setArticles(results); 
  };

  return (
    <div>
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
    </div>
  );
};

export default SearchBar;
