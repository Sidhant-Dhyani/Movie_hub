import React, { useState } from 'react'
import './BookingForm.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BookingForm = () => {
    const [movie, setMovie] = useState({
        name: '',
        id: ''
    });
    const [ticketCost, setTicketCost] = useState('Gold');
    const [username, setUsername] = useState('');
    const [numTickets, setNumTickets] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const handleNumTicketsChange = (event) => {
        const tickets = parseInt(event.target.value, 10);
        setNumTickets(tickets);
        setTotalCost(tickets * (ticketCost === 'Gold' ? 100 : 80));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { Movie: movie, Type_of_Ticket: ticketCost, Name: username, Num_of_Tickets: numTickets, Cost: totalCost };
        const existingLocalBookings = localStorage.getItem('bookings');
        const existingBookings = existingLocalBookings ? JSON.parse(existingLocalBookings) : [];
        const updatedBookings = [...existingBookings, formData];
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        alert(`Booked ${numTickets} tickets successfully`);
        navigate('/');
        console.log('FormData: ', formData);
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                setMovie({ ...movie, name: response.data.name, id: response.data.id });
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchMovie();
    }, []);

    return (
        <div className='booking_form'>
            <form onSubmit={handleSubmit} className='form_container'>
                <label>
                    Movie Name:
                    <input type="text" value={movie.name} readOnly required />
                </label>
                <label>
                    Movie id:
                    <input type="text" value={movie.id} readOnly required />
                </label>
                <label>
                    Ticket Cost:
                    <select value={ticketCost} onChange={(e) => {
                        setTicketCost(e.target.value)
                        setTotalCost(numTickets * (e.target.value === 'Gold' ? 100 : 80))
                    }} required>
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                    </select>
                </label>
                <p>(Gold: $100, Silver: $80)</p>
                <label>
                    Name:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Number of Tickets:
                    <input type="number" value={numTickets} onChange={handleNumTicketsChange} required />
                </label>
                <label>
                    Total Cost:
                    <input type="text" value={totalCost} readOnly required />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BookingForm;