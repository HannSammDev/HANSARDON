import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";

export const Guest = () => {
    const [name, setName] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [roomName, setRoomName] = useState('');
    const [payment, setPayment] = useState('');
    const [method, setMethod] = useState('');
    const [guests, setGuests] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [succesDelete, setDelete] = useState('')

    useEffect(() => {
        fetchGuests();
    }, []);

    const fetchGuests = () => {
        axios.get('http://localhost:3002/add-guest')
            .then((response) => {
                console.log('Fetched Successfully', response.data);

                const formattedGuests = response.data.results.map(guest => ({
                    ...guest,
                    checkin: new Date(guest.checkin).toLocaleString(),
                    checkout: new Date(guest.checkout).toLocaleString()
                }));
                setGuests(formattedGuests);
                setTimeout(() => {
                    setSuccessMessage('');
                }, 10000);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const Addguest = (e) => {
        e.preventDefault();
        const guestData = {
            name: name,
            checkin: checkin,
            checkout: checkout,
            room_name: roomName,
            payment: payment,
            method: method
        };

        axios.post('http://localhost:3002/add-guest', guestData)
            .then((response) => {
                console.log('Guest Added', response);
                setSuccessMessage('Added Guest Successfully');
                fetchGuests();

                setName('');
                setCheckin('');
                setCheckout('');
                setRoomName('');
                setPayment('');
                setMethod('');
            })
            .catch(error => {
                console.log(error);
            })
    };

    const deleteGuest = (id) => {
        console.log('Deleting guest with id:', id);
        axios.delete(`http://localhost:3002/delete-guest/${id}`)
            .then(response => {
                setDelete('Deleted Guest')
                console.log(response.data.message);
                setGuests(guests.filter(guest => guest.id !== id));
            })
            .catch(error => {
                console.error('Error deleting guest:', error);
            });
    };

    return (
        <>
            <div className="modal fade" id="addguest" tabIndex="-1" aria-labelledby="modaladdguest" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modaladdguest">Add Guest</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={Addguest} encType="multipart/form-data">
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
                                    <input type="datetime-local"
                                        className="form-control"
                                        id="guestCheckin"
                                        name='checkin'
                                        value={checkin}
                                        onChange={(e) => setCheckin(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="guestCheckout" className="form-label">Checkout</label>
                                    <input type="datetime-local"
                                        className="form-control"
                                        id="guestCheckout"
                                        name='checkout'
                                        value={checkout}
                                        onChange={(e) => setCheckout(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="guestRoomType" className="form-label">Room Name</label>
                                    <input type='text'
                                        id="guestRoomType"
                                        className="form-control"
                                        name='room_name'
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)} />
                                </div>
                                <label htmlFor="guestPrice" className="form-label">Payment</label>
                                <div className="mb-3 input-group">

                                    <span class="input-group-text" id="addon-wrapping">₱</span>
                                    <input type="text"
                                        className="form-control"
                                        id="guestPrice"
                                        name="payment"
                                        value={payment}
                                        onChange={(e) => setPayment(e.target.value)}
                                        placeholder="Enter guest payment"
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="guestMethod" className="form-label">Method</label>
                                    <select type="text"
                                        className="form-control"
                                        id="guestMethod"
                                        name="method"
                                        value={method}
                                        onChange={(e) => setMethod(e.target.value)}
                                        placeholder="Enter payment method"
                                        required>
                                        <option value="gcash">Gcash</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="debitcard">Debit Card</option>
                                    </select>
                                </div>
                                <button style={{ border: 'none' }} type="submit" className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <div className="container" style={{ paddingBottom: '18em' }}>
                <button className="btn btn-primary mb-3" style={{ marginLeft: '7em' }} data-bs-toggle="modal" data-bs-target="#addguest" ><IoIosAdd style={{ fontSize: '2em' }} />Add Guest</button>

                <div className="">
                    {successMessage && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ padding: '10px 30px 10px 10px', width: '50%' ,width: '90%', marginLeft: '7em'}}>
                            {successMessage}
                            <button type="button" className="btn-close" onClick={() => setSuccessMessage('')} aria-label="Close" style={{ padding: '15px 10px' }}></button>
                        </div>
                    )}
                    {succesDelete && (
                        <div className={`alert ${succesDelete.includes('successfully') ? 'alert-success' : 'alert-warning'} alert-dismissible fade show`} role="alert" style={{width: '90%', marginLeft: '7em'}}>
                            {succesDelete}
                            <button style={{ backgroundColor: 'transparent', float: 'right' }} type="button" className="btn-close btn-alert" onClick={() => setDelete('')} aria-label="Close"></button>
                        </div>
                    )}
                    <table className="table table-success table-hover" style={{ width: '90%', marginLeft: '7em' }}>

                        <thead>

                            <tr>
                                <th>Name</th>
                                <th>Checkin</th>
                                <th>Checkout</th>
                                <th>Room Name</th>
                                <th>Payment</th>
                                <th>Method</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {guests.map((guest, index) => (
                                <tr key={index} className="table-light">
                                    <td>{guest.name}</td>
                                    <td>{guest.checkin}</td>
                                    <td>{guest.checkout}</td>
                                    <td>{guest.room_name}</td>
                                    <td>{guest.payment}</td>
                                    <td>{guest.method}</td>
                                    <td>
                                        <Link to={`/editguest/${guest.id}`} type="button" className="btn"><FontAwesomeIcon icon={faEdit} style={{ color: '#FFA500' }} /></Link>
                                        <a type="button" className="btn" data-bs-dismiss="modal"><FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red' }} onClick={() => deleteGuest(guest.id)} /></a>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};
