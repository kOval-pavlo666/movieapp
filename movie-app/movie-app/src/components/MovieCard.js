// src/components/MovieCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const [genres, setGenres] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some(favMovie => favMovie.id === movie.id));
    }, [movie.id]);

    const handleToggleFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFav = favorites.some(favMovie => favMovie.id === movie.id);

        if (isFavorite) {
            favorites = favorites.filter(favMovie => favMovie.id !== movie.id);
        } else {
            favorites.push(movie);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        window.dispatchEvent(new Event('storage')); // Триггер для оновлення списку обраних
        setIsFavorite(!isFav);
    };

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                    api_key: '2fce9ffbb795345b82084d1d34d5821a',
                    language: 'uk'
                }
            });
            setGenres(response.data.genres);
        };

        fetchGenres();
    }, []);

    const getGenres = (genreIds) => {
        if (!genres.length) {
            return 'Loading genres...'; // Поки дані про жанри не завантажені, показуємо повідомлення про завантаження
        }

        return genreIds.map(id => genres.find(genre => genre.id === id)?.name || 'Unknown').join(', ');
    };


    const containerStyle = {
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '10px',
        maxWidth: '400px',
        margin: '20px auto',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    };

    const imgStyle = {
        width: '100%',
        height: 'auto',
        borderRadius: '10px'
    };

    const titleStyle = {
        fontSize: '24px',
        margin: '20px 0 10px'
    };

    const overviewStyle = {
        fontSize: '16px',
        color: '#555'
    };

    const genresStyle = {
        fontSize: '14px',
        color: '#777',
        marginTop: '10px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: isFavorite ? 'red' : 'green',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    return (
        <div style={containerStyle}>
            <Link key={movie.id} to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} style={imgStyle} alt={movie.title} />
            </Link>
            <h1 style={titleStyle}>{movie.title}</h1>
            <p style={overviewStyle}>{movie.overview}</p>
            <p style={genresStyle}>{getGenres(movie.genre_ids)}</p>
            <button onClick={handleToggleFavorite} style={buttonStyle}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default MovieCard;
