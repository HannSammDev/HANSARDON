import React, { useEffect, useState } from "react"; // Import useState
import Axios from "axios";

export const Rooms = () => {
    // Define rooms state
    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await Axios.get('http://localhost:3002/add-rooms');
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    
    const fetchAvailable = async () => {
        try {
            const response = await Axios.get(`http://localhost:3002/update-availability/${id}`);
            setRooms(prevRooms => 
                prevRooms.map(room => 
                    room.room_id === response.data.room_id 
                        ? { ...room, available: response.data.available }
                        : room
                )
            );
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    useEffect(() => {
        fetchAvailable();
    }, []);

    return (
        <>
            <div style={{ minHeight: '100vh', position: 'absolute', paddingBottom: '2em', marginTop: '7em' }}>
                {rooms && rooms.map((room, index) => (
                    <div key={index} className="row featurette d-flex align-items-center mb-4" style={{ marginLeft: '3em', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)', width: '80%' }}>
                        {/* VIP Room */}
                        <div style={{ boxShadow: 'black', boxSizing: 'border-box', height: 'auto', borderColor: 'transparent' }} className="card col-md-4 order-md-1">
                            <img style={{ width: '100%', height: 'auto', objectFit: 'cover' }} className="img-fluid mx-auto hover-img" src={`../img/${room.image}`} alt="VIP Room" />
                        </div>
                        <div className="col-md-6 order-md-2 px-md-5 mb-4" >
                            <h2 className="lh-1 mb-4 mt-2">{room.room_name}</h2>
                            <p style={{textAlign:'justify'}}>{room.description}</p>
                            <p className="fs-5 fw-bold">₱{room.price}</p>
                            <p className="fs-5" style={{ color: room.available ? 'green' : 'red' }}>{room.available ? 'Available' : 'Not Available'}</p>
                        </div>
                    </div>
                ))}
                
            </div >
        </>
    );
};
