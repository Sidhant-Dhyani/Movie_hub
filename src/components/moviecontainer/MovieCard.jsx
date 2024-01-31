
import React from 'react'
import './MovieCard.css'
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ props }) => {
    const image = props && props.image;
    const originalImage = image ? image.original : null;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${props.id}`);
    }

    return (
        <div className='card'>
            <div className='card_img'>
                {originalImage && <img src={props.image.original} alt="" />}
            </div>
            <div className='card_content'>
                <h1>{props.name}</h1>
                <p>Type: {props.type}</p>
                <p>Language: {props.language}</p>
                <p>Rating: {props.rating.average}⭐</p>
                <p> <span style={{ color: "red" }}>Genre:  </span>{props.genres.join(', ')}</p>
                <button className='know_more' onClick={handleClick}>Know More</button>
            </div>
        </div>
    )
}

export default MovieCard;