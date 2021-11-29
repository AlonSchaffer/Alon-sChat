import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import axios from 'axios'

function LoginForm() {
    const [details, setDetails] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const submitHandler = async e => {
        e.preventDefault();
        await axios.post("http://localhost:3001/users/checkuser",details).then(res=>{
            if(res.data== true){               
                navigate(`/home/${details.username}`)
            }
            else{
                setError('User Not Found')
            }
        }).catch(err =>{
            console.log(err)
        })
        
    }
    return (
        <div>
            <h1> Alon`s Chat</h1>
            <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Login</h2>
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
                <input type="submit" value="Login" />
            </div>
            <input type="button" value="Create new account" onClick={() => navigate('/signup', { replace: true })} />
            {(error !== "" ? (<div className="error">{error}</div>) : "")}
        </form>
        </div>
    )
}

export default LoginForm
