
import React, { useEffect, useState } from 'react'
import './MoviePage.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MoviePage = () => {
    const params = useParams();
    const id = params.id;
    const [movie, setMovie] = useState();
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                setMovie(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchMovie();
    }, []);

    return (
        <div className='movie_page'>
            <div className='movie_page_img'>
                <img src={movie?.image?.original} alt="" />
            </div>
            <div className='movie_page_content'>
                <h1>{movie?.name}</h1>
                <p><span>Language: </span>{movie?.language}</p>
                <p><span>Rating: </span>{movie?.rating?.average}⭐</p>
                <p><span style={{ color: "red" }}>Genre: </span>{movie?.genres.join(', ')}</p>
                <p><span>Premiered: </span>{movie?.premiered}</p>
                <p><span>Status: </span>{movie?.status}</p>
                <p> <span>Type: </span>{movie?.type}</p>
                <p><span>Official Site: </span> <Link to={movie?.officialSite} target='_blank'>{movie?.officialSite}</Link></p>
                <p dangerouslySetInnerHTML={{ __html: movie?.summary }} ></p>
            </div>
        </div>
    )
}

export default MoviePage;

