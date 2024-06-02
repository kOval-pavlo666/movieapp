import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { Pagination } from 'react-bootstrap';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovies = useCallback(() => {
    axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: '2fce9ffbb795345b82084d1d34d5821a',
        page: currentPage,
        language: 'uk'
      },
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmNlOWZmYmI3OTUzNDViODIwODRkMWQzNGQ1ODIxYSIsInN1YiI6IjY2NTRlNTgyOWM0MzAxMTBmOWI3ZGVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0gfGnOiVDsBd2vUCYbC1GTXOFqNRVIvI0Vlz9_Yg9Bk'
      }
    }).then((response) => {
      setMovies(response.data.results);
    });
  }, [currentPage]);

  const fetchMoviesByName = useCallback((movieName) => {
    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        query: movieName,
        api_key: '2fce9ffbb795345b82084d1d34d5821a',
        page: currentPage,
        language: 'uk'
      },
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmNlOWZmYmI3OTUzNDViODIwODRkMWQzNGQ1ODIxYSIsInN1YiI6IjY2NTRlNTgyOWM0MzAxMTBmOWI3ZGVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0gfGnOiVDsBd2vUCYbC1GTXOFqNRVIvI0Vlz9_Yg9Bk'
      }
    }).then((response) => {
      setMovies(response.data.results);
    });
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery) {
      fetchMoviesByName(searchQuery);
    } else {
      fetchMovies();
    }
  }, [fetchMovies, fetchMoviesByName, searchQuery, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const containerStyle = {
    backgroundColor: '#141414',
    color: '#fff',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    fontSize: '2em',
    marginBottom: '20px'
  };

  const searchContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  };

  const inputStyle = {
    padding: '10px',
    width: 'calc(100% - 120px)',
    marginRight: '10px',
    borderRadius: '3px',
    border: '1px solid #ccc',
    backgroundColor: '#333',
    color: '#fff'
  };

  const buttonStyle = {
    backgroundColor: '#e50914',
    borderColor: '#e50914',
    color: '#fff',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '3px',
    outline: 'none',
    border: 'none',
    fontSize: '1em',
  };

  const clearButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#b3b3b3',
    borderColor: '#b3b3b3'
  };

  const paginationStyle = {
    display: 'flex',
    listStyle: 'none',
    padding: '0',
    justifyContent: 'center',
    marginTop: '20px'
  };

  const paginationButtonStyle = {
    backgroundColor: '#333',
    borderColor: '#333',
    color: '#fff',
    padding: '6px 12px',
    margin: '0 3px',
    cursor: 'pointer',
    borderRadius: '3px',
    outline: 'none',
    border: 'none',
  };

  return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Popular Movies</h1>
        <div style={searchContainerStyle}>
          <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for movies..."
              style={inputStyle}
          />
          <button onClick={handleClearSearch} style={clearButtonStyle}>Clear</button>
        </div>
        <div>
          {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <Pagination style={paginationStyle}>
          <Pagination.First style={paginationButtonStyle} onClick={() => handlePageChange(1)} />
          <Pagination.Prev style={paginationButtonStyle} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          <Pagination.Item style={paginationButtonStyle} active>{currentPage}</Pagination.Item>
          <Pagination.Next style={paginationButtonStyle} onClick={() => handlePageChange(currentPage + 1)} />
        </Pagination>
      </div>
  );
};

export default MovieList;
