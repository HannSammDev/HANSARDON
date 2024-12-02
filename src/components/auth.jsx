import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useState } from "react";


export const Register = () =>{
    const signIn = () =>{
        const [name,'setName'] = useState("");
        const [email, 'setEmail'] = useState
    }
}
   
    return (
        <>
            <form className="register" style={{ width: '35%' }} onSubmit={handleSubmit}>
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
                            onChange={(e) => setName(e.target.value)} 
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
                            onChange={(e) => setEmail(e.target.value)} 
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
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div style={{ marginTop: '1em' }} className="input-item">
                        <button onClick={signin} style={{ width: '30%' }} type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
            <Body />
        </>
    );
}

export default Register;
