import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("entered the click");
    const authentication = await actions.login({ email, password });
    console.log("result from sign up authentication::", authentication);
    console.log("fetch attempted to sign up email: ", email);
    console.log("fetch attempted to sign up password: ", password);
    if (authentication == "400") alert("wrong password or email address");
    if (authentication == true) navigate("/private");
  };
  return (
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
