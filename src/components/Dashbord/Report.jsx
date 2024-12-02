import React, { useEffect, useState } from "react";
import axios from "axios";

function Report() {
    const [guests, setGuests] = useState([]);

    const Print = () => {
        window.print();
    };

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
            })
            .catch(error => {
                console.log(error);
            });
    };
    

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                
                    <table  id="print-content" className="table table-hover table-responsive" style={{ width: '80%', border: '1px solid black', padding: '10px', borderCollapse: 'collapse' }}>
                        <thead>
                       
                            <tr className="table-primary">
                                <th style={{ border: '1px', padding: '10px' }}>Customer Name</th>
                                <th style={{ border: '1px', padding: '10px' }}>Check-in</th>
                                <th style={{ border: '1px', padding: '10px' }}>Check-out</th>
                                <th style={{ border: '1px', padding: '10px' }}>Room Name.</th>
                                <th style={{ border: '1px', padding: '10px' }}>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                        {guests.map((guest, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px', padding: '10px' }}>{guest.name}</td>
                                <td style={{ border: '1px', padding: '10px' }}>{guest.checkin}</td>
                                <td style={{ border: '1px', padding: '10px' }}>{guest.checkout}</td>
                                <td style={{ border: '1px', padding: '10px' }}>{guest.room_name}</td>
                                <td style={{ border: '1px', padding: '10px' }}>{guest.payment}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
             
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginLeft: '72%', marginTop: '0px' }}>
                <button onClick={Print} className="btn btn-primary">Print Receipt</button>
            </div>
        </div>
    );
}

export default Report;
