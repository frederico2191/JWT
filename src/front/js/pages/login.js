import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";


export const Login = (props) => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleClick = async () => {
  const authentication = await actions.signup({email,password})
  console.log("result from sign up registrsation::",authentication)
  console.log("fetch attempted to sign up email: ",email)
  console.log("fetch attempted to sign up password: ",password)
  // if (authentication =="400") alert("user already exists")
  // if (registration =="200") navigate("/login")
  }
  

  if (store.token && store.token != "" && store.token != undefined)
    navigate("/");

  return (
    <div className="text-center">
      <h1>Login</h1>
      {token && token != "" && token != undefined ? (
        "You are logged in with this token:" + store.token
      ) : (
        <form onSubmit={handleClick}>
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
          {/* <button type="submit" onClick={handleClick}>Login</button> */}
          <button type="submit" >Login</button>
        </form>
      )}
    </div>
  );
};

Login.propTypes = {
  match: PropTypes.object,
};
