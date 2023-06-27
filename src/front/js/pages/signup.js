import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";



export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async() => {
    const registration = await actions.signup({email,password})
    console.log("result from sign up registrsation::",registration)
    console.log("fetch attempted to sign up email: ",email)
    console.log("fetch attempted to sign up password: ",password)
    if (registration =="400") alert("user already exists")
    if (registration =="200") navigate("/login")
    

  };
  return (
    <div>
      <div className="text-center">
        <h1>Sign-Up</h1>
       
          <div>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button onClick={handleSubmit}>Register</button>
          </div>
        
      </div>
      
    </div>
  );
};
