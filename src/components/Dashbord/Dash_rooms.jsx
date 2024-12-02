import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { Link } from "react-router-dom";
import { Guest } from "./Guest";
import { IoIosAdd } from "react-icons/io";

const DashboardRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [roomName, setRoomName] = useState('');
    const [price, setPrice] = useState('');
   
    const [successMessage, setSuccessMessage] = useState('');
    const [successDelete, setDelete] = useState('');

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

    const createRooms = () => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('roomName', roomName);
        formData.append('price', price);

        Axios.post('http://localhost:3002/add-room', formData)
            .then((response) => {

                console.log('Room Added Successfully', response);
                setSuccessMessage('Room added successfully!');

                setImage(null);
                setDescription('');
                setRoomName('');
                setPrice('');
                fetchRooms();
            })
            .catch(error => {
                console.error("Error adding room:", error);
            });
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleDelete = (id) => {
        console.log('Deleting room with id:', id);
        axios.delete(`http://localhost:3002/delete/${id}`)
            .then(response => {
                console.log(response.data.message);
                setDelete('Room deleted successfully!');
                fetchRooms()
            })
            .catch(error => {
                console.error('Error deleting room:', error);
            });
    };

    const handleAvailabilityChange = (roomId, availability) => {
        console.log('Updating availability for room with id:', roomId, 'to', availability);
        axios.put(`http://localhost:3002/update-availability/${roomId}`, { available: availability })
            .then(response => {
                console.log(response.data.message);
                setRooms(prevRooms => {
                    return prevRooms.map(room => {
                        if (room.id === roomId) {
                            return { ...room, available: availability };
                        } else {
                            return room;
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Error updating availability:', error);
            });
    };

    return (
        <div  className="container-fluid d-flex align-items-center justify-content-center " style={{ minHeight: '70vh', position: 'absolute', paddingBottom: '10em', paddingTop: '7em' }}>
            <div className="container ">

                {/* Add Room */}
                <a className="btn btn-primary text-center fs-5" data-bs-toggle="modal" data-bs-target="#examplemodal"
                    style={{ padding: '3px', display: 'inline-block', cursor: 'pointer', width: 'auto', marginBottom: '1em', marginLeft: '7em' }} href=""><IoIosAdd style={{ fontSize: '2em' }} />Add Room</a>
                {/* Success message */}
                {successMessage && (
                    <div style={{ marginLeft: '9em' }} className="alert alert-success alert-dismissible fade show" role="alert">
                        {successMessage}
                        <button type="button" className="btn-close" onClick={() => setSuccessMessage('')} aria-label="Close"></button>
                    </div>
                )}
                {successDelete && (
                    <div style={{ backgroundColor: '#fff3CD', marginLeft: '9em' }} className={`alert ${successDelete.includes('successfully') ? 'alert-success' : 'alert-warning'} alert-dismissible fade show`} role="alert">
                        {successDelete}
                        <button style={{ backgroundColor: 'transparent' }} type="button" className="btn-close btn-alert" onClick={() => setDelete('')} aria-label="Close"></button>
                    </div>
                )}

                <div className="modal fade" id="examplemodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Room</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form id="roomForm" encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">Upload Picture</label>
                                        <input type="file" className="form-control"
                                            id="image" name="image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea className="form-control"
                                            id="description"
                                            name="description"
                                            rows="3"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                            required>
                                        </textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="roomName" className="form-label">Room Name</label>
                                        <input className="form-control"
                                            type="text"
                                            name="room_name"
                                            id="roomName"
                                            value={roomName}
                                            onChange={(event) => setRoomName(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input type="text"
                                            className="form-control"
                                            id="price"
                                            name="price"
                                            value={price}
                                            onChange={(event) => setPrice(event.target.value)}
                                            required
                                        />
                                    </div>

                                    <button type="button" className="btn btn-primary" onClick={createRooms}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {rooms.map((room, index) => (
                    <div key={index} className="row featurette d-flex align-items-center mb-5 border border-dark" style={{ marginLeft: '9em', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)', paddingTop: '1em' }}>
                        {/* VIP Room */}
                        <div style={{ boxShadow: 'black', boxSizing: 'border-box', height: 'auto' }} className=" col-md-4 order-md-1">
                            <img style={{ width: '100%', height: 'auto', objectFit: 'cover' }} className="img-fluid mx-auto hover-img" src={`../img/${room.image}`} alt="VIP Room" />
                            <div className="form-check" style={{marginTop:'1em'}}> 
                                <input className="form-check-input border border-dark" type="radio" name={`availability-${index}`} id={`flexRadioDefault1-${index}`} checked={room.available === true} onChange={() => handleAvailabilityChange(room.id, true)} />
                                <label className="form-check-label  " htmlFor={`flexRadioDefault1-${index}`}>
                                   Available
                                </label>
                            </div>
                            
                            <div className="form-check">
                                <input className="form-check-input border border-dark" type="radio" name={`availability-${index}`} id={`flexRadioDefault2-${index}`} checked={room.available === false} onChange={() => handleAvailabilityChange(room.id, false)} />
                                <label className="form-check-label " htmlFor={`flexRadioDefault2-${index}`}>
                                    Unavailable
                                </label>
                            </div>
                        </div>
                        
                        <div className="col-md-6 order-md-2 px-md-5 mb-4">
                            <h2 className="lh-1 mb-4 mt-2">{room.room_name}</h2>
                            <p style={{ textAlign: 'justify' }}>{room.description}</p>
                            <p className="fs-5 fw-bold">₱{room.price}</p>
                            <Link className="text-dark fs-5" style={{ textDecoration: 'none', marginRight: '1em' }} to={`/update/${room.id}`}>
                                <FontAwesomeIcon icon={faEdit} style={{ color: '#FFA500' }} /> Edit
                            </Link>
                            <Link className="text-dark fs-5" style={{ textDecoration: 'none', marginRight: '1em' }} onClick={() => handleDelete(room.id)}>
                                <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red' }} /> Delete
                            </Link>
                            <Link className="text-dark fs-5" style={{ textDecoration: 'none', marginRight: '1em' }} to={`/rooms/${room.id}`}>
                                <FontAwesomeIcon icon={faEye} style={{ color: 'green' }} /> View
                            </Link>
                           
                        </div>
                    </div>

                ))}
                <Guest />
            </div>
        </div>
    );
};

export default DashboardRooms;
