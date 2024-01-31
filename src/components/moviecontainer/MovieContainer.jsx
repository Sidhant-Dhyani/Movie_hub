import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './MovieContainer.css'
import MovieCard from './MovieCard'

const MovieContainer = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setMovies(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className='Movie_container'>
      {
        movies.map((movie) => (
          <MovieCard key={movie.show.id} props={movie.show}/>
        ))
      }
    </div>
  )
}

export default MovieContainer;