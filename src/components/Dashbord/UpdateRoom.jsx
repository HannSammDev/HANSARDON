import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export const UpdateRooms = () => {
    const { id } = useParams();

    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [roomName, setRoomName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
       
    }, [id]);

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('room_name', roomName);
        formData.append('price', price);

        Axios.put(`http://localhost:3002/update/${id}`, formData)
            .then(() => {
                console.log("Room Updated");
                window.location.href = '/dash'; 
               
                setImage(null);
                setDescription('');
                setRoomName('');
                setPrice('');
                
            })
            .catch(error => {
                console.error("Error updating room:", error);
            });
    };

    return (
        <>
        <div className="container" style={{marginTop:'9em',paddingBottom:'5em'}}>
            <form className='border border-dark' id="roomForm" encType="multipart/form-data" style={{ marginTop: '10em', maxWidth: '500px', margin: '0 auto', padding: '15px',boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',borderRadius:'10px' }}>
                <div className="modal-header mb-2" >
                    <h5 className="modal-title col" id="exampleModalLabel">Update Room</h5>
                    <Link  to='/dash'><button type="button" className="btn-close col" data-bs-dismiss="modal" aria-label="Close"></button></Link>
                </div>
                <div className="mb-2">
                    <label htmlFor="image" className="form-label">Upload Picture</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-1">
                    <label htmlFor="roomName" className="form-label">Room Name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="room_name"
                        id="roomName"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="button" className="btn btn-primary" style={{ marginTop: '20px' }} onClick={handleUpdate}>Update</button>
            </form>
            </div>
        </>
    )
}
