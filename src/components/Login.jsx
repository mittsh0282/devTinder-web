import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';


const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId, password
            }, {
                withCredentials: true
            });
            console.log(res.data);
            dispatch(addUser(res.data));
            return navigate("/");
        } catch (err) {
            setError(err.message);
            console.error(err?.response?.data || "Something went wrong");
        }
    }
    return (
        <div className="flex justify-center my-10">
            <div class="card bg-base-200 w-96">
                <div class="card-body">
                    <h2 class="card-title justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input type="text" value={emailId} className="input" placeholder="Type here" onChange={(e) => setEmailId(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset py-2">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="text" value={password} className="input" placeholder="Type here" onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <p className="text-red-500">ERROR Message is here</p>
                    <div class="card-actions justify-center m-2">
                        <button class="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login