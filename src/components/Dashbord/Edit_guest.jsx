import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios';

export const Edit_guest = () => {
    const {id} = useParams()
    const [name, setName] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [roomName, setRoomName] = useState('');
    const [payment, setPayment] = useState('');
    const [method, setMethod] = useState('');

    useEffect(() => {
        // Fetch guest data based on ID
       
    }, [id]);

    const handleEditguest = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('checkin', checkin);
        formData.append('checkout', checkout);
        formData.append('room_name', roomName);
        formData.append('payment', payment);
        formData.append('method', method);
    
        Axios.put(`http://localhost:3002/editguest/${id}`, formData)
            .then(() => {
                console.log('Guest Info Updated');
                setName('');
                setCheckin('');
                setCheckout('');
                setRoomName('');
                setPayment('');
                setMethod('');
                window.location.href = '/dash';
            })
            .catch((error) => {
                console.error('Error updating Guest Info.', error);
                if (error.response) {
                    console.error('Error status:', error.response.status);
                    console.error('Error data:', error.response.data);
                }
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditguest(e);
    };
    
    return (
        <div className="container" style={{ position: 'fixed', top: '36%', left: '65%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>
            <form className=" row border border-dark"  encType="multipart/form-data" style={{ width: '800px', padding: '2em', borderRadius: '10px' }} onSubmit={handleSubmit}>
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="guestName" className="form-label">Guest Name</label>
                        <input type="text"
                            className="form-control"
                            id="guestName"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter guest name"
                            required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="guestCheckin" className="form-label">Checkin</label>
                        <input type="date"
                            className="form-control"
                            id="guestCheckin"
                            name='checkin'
                            value={checkin}
                            onChange={(e) => setCheckin(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="guestCheckout" className="form-label">Checkout</label>
                        <input type="date"
                            className="form-control"
                            id="guestCheckout"
                            name='checkout'
                            value={checkout}
                            onChange={(e) => setCheckout(e.target.value)} />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="guestRoomType" className="form-label">Room Name</label>
                        <input type='text'
                            id="guestRoomType"
                            className="form-control"
                            name='roomName'
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="guestPayment" className="form-label">Payment</label>
                        <input type="text"
                            className="form-control"
                            id="guestPayment"
                            name="payment"
                            value={payment}
                            onChange={(e) => setPayment(e.target.value)}
                            placeholder="Enter guest payment"
                            required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="guestMethod" className="form-label">Method</label>
                        <input type="text"
                            className="form-control"
                            id="guestMethod"
                            name="method"
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            placeholder="Enter payment method"
                            required />
                    </div>
                </div>
                <button style={{ border: 'none' }} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
