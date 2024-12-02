import React, { useState } from "react";
import Body from "./Body";

import Axios from "axios";
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createUser = () => {
        Axios.post('http://localhost:3003/register', {
            Name: name,
            Email: email,
            Password: password,
        }).then((response) => {
            console.log('User Has benn Created',response);
            window.location.href = '/login';
        })
    }
    return (
        <>
            <div style={{ position: 'fixed', top: '42%', left: '85%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>
                <form className="register bg-white" style={{ width: '350px' }} >

                    <div className="text-center">
                        <h1 className="fs-2">Register</h1>
                    </div>
                    <div className="form-group">
                        <div style={{ marginTop: '2px' }} className="input-item">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div className="input-item">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="input-item">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <div style={{ marginTop: '1em' }} className="input-item">
                            <button style={{ width: '30%' }} type="submit" className="btn btn-primary" onClick={createUser}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <Body />
        </>
    );
}

export default Register;
