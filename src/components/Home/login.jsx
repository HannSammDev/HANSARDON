import React, { useState } from "react";
import Axios from "axios";
import Body from "./Body";
import "@fortawesome/fontawesome-free/css/all.css";

const Login = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');
    const [showPassword, setShowPassword] = useState(false); // New state for password visibility

    const loginUser = () => {
        Axios.post('http://localhost:3003/login', {
            Email: loginEmail,
            Password: loginPassword,
        })
            .then((response) => {
                console.log(response);
                setIsLoggedIn(true);
                localStorage.setItem('userEmail', loginEmail);
                window.location.href = '/dash';
            }).catch((error) => {
                console.error('Login Error:', error);
                setErrorLogin('Wrong passwod and email!!');
            });
    };

    return (
        <>
            <div style={{ position: 'fixed', top: '36%', left: '85%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>
                <form className="login bg-white" style={{ width: '350px' }} >
                    <div className="text-center">
                        <h1 className="fs-2">Login</h1>
                    </div>
                    {errorLogin && (
                        <div className={`alert ${errorLogin ? 'alert-danger' : 'd-none'} alert-dismissible fade show`} role="alert" style={{ padding: '10px 30px 10px 10px' }}>
                            <span style={{ color: errorLogin ? '#721c24' : 'transparent' }}>{errorLogin}</span>
                            <button style={{ backgroundColor: errorLogin ? '#f8d7da' : 'transparent', padding: '15px 10px' }} type="button" className="btn-close btn-alert" onClick={() => setErrorLogin('')} aria-label="Close"></button>
                        </div>
                    )}
                    <div className="form-group">
                        <div style={{ marginTop: '2px' }} className="input-item">
                            <label htmlFor="" className="input-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="example@gmail.com"
                                value={loginEmail}
                                onChange={(event) => setLoginEmail(event.target.value)}
                                required
                            />
                        </div>

                        <div className="input-item">
                            <label htmlFor="" className="input-label">
                                Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    value={loginPassword}
                                    onChange={(event) => setLoginPassword(event.target.value)}
                                    required
                                    style={{ paddingRight: "2.5rem" }}
                                />
                                <i
                                    className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer"
                                    }}
                                ></i>
                            </div>

                        </div>
                        <div style={{ marginTop: '1em' }} className="input-item text-center">
                            <button style={{width:'98%'}} type="button" className="btn btn-primary" onClick={loginUser}>Login</button>
                            <p>Don't have an account? <a href="/register">Register</a></p>
                        </div>
                    </div>
                </form>
            </div>
            <Body />
        </>
    );
}

export default Login;
