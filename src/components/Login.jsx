import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';


const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
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
            setError(err?.response?.data || "Something went wrong");
        }
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", {
                firstName, lastName, emailId, password
            }, { withCredentials: true });

            dispatch(addUser(res.data.data));
            return navigate("/profile");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    }
    return (
        <div className="flex justify-center my-10">
            <div class="card bg-base-200 w-96">
                <div class="card-body">
                    <h2 class="card-title justify-center">{isLoginForm ? "Login" : "Sign up"}</h2>
                    <div>
                        {!isLoginForm && (
                            <>
                              <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input 
                                  type="text" 
                                  value={firstName} 
                                  className="input input-bordered w-full max-w-xs"
                                  onChange={(e) => setFirstName(e.target.value)}
                                />
                              </label>
                              <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Last Name</span>
                                </div>
                                <input
                                  type="text"
                                  value={lastName}
                                  className="input input-bordered w-full max-w-xs"
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                              </label>
                            </>
                        )}
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input type="text" value={emailId} className="input" placeholder="Type here" onChange={(e) => setEmailId(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset py-2">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" value={password} className="input" placeholder="Type here" onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div class="card-actions justify-center m-2">
                        <button class="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm((value) => !value)}>
                        {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login