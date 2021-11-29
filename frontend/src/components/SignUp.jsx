import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import DataBaseService from '../DataBaseService/DataBaseService';
function SignUp() {
    const [details, setDetails] = useState({ username: "", email: "", password: ""});
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        if (DataBaseService.AddUser(details)) {
            navigate(`/home/${details.username}`)
        }
        else {
            console.error();
        }
    }
    return (
        <div>
            <input type="button" value="close" onClick={() => navigate('/')} />
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <h1>Create New Account</h1>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                    </div>
                    <input type="submit" value="Create new account" />
                </div>
            </form>
        </div>
    )
}

export default SignUp
