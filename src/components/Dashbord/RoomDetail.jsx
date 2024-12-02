import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRoom();
        fetchAvailable();
    }, [id]);

    const fetchRoom = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/rooms/${id}`);
            setRoom(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching room:', error);
            setError(error);
            setLoading(false);
        }
    };

    const fetchAvailable = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/update-availability/${id}`);
            setRoom(prevRoom => ({ ...prevRoom, available: response.data.available }));
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!room) {
        return <div>Room not found</div>;
    }

    return (
        <>
            <div className="container">
                <div className="card mb-3" style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)', paddingTop: '1em', padding: '1em' }}>
                    <img style={{ width: '70%', height: 'auto', objectFit: 'cover' }} className="img-fluid mx-auto hover-img" src={`../img/${room.image}`} alt="..." />
                    <div className="card-body" style={{ height: '230px' }}>
                        <h5 className="card-title lh-1 mb-4 mt-2">{room.room_name}</h5>
                        <p className="" style={{ textAlign: 'justify' }}>{room.description}</p>
                        <p className="card-text fs-5 fw-bold"><small className="text-body-secondary">₱ {room.price}</small></p>
                        <p className="fs-5" style={{ color: room.available ? 'green' : 'red' }}>{room.available ? 'Available' : 'Not Available'}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoomDetail;
