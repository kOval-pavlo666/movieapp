import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favorites';

const App = () => {
  return (
      <Router>
        <div>
          <nav style={navStyle}>
            <ul style={ulStyle}>
              <li style={liStyle}>
                <Link to="/" style={linkStyle}>Home</Link>
              </li>
              <li style={liStyle}>
                <Link to="/favorites" style={linkStyle}>Favorites</Link>
              </li>
            </ul>
          </nav>
          <div style={contentStyle}>
            <Routes>
              <Route exact path="/" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

const navStyle = {
  backgroundColor: '#141414',
  padding: '10px 20px',
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 1000,
  borderBottom: '2px solid #e50914'
};

const ulStyle = {
  listStyleType: 'none',
  display: 'flex',
  justifyContent: 'flex-start',
  margin: 0,
  padding: 0,
};

const liStyle = {
  margin: '0 20px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.2em',
  fontWeight: 'bold',
  transition: 'color 0.3s',
};

const contentStyle = {
  paddingTop: '60px', // To offset the fixed navbar height
  backgroundColor: '#141414',
  minHeight: '100vh',
  color: '#fff',
};

linkStyle[':hover'] = {
  color: '#e50914',
};

export default App;
