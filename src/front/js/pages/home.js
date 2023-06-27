import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const { store, actions } = useContext(Context);
  const handleLoginClick = () => {
    actions.login("amigos@gmail.com", "1234");
    navigate("/login");
  };
  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="text-center mt-5">
      <h1>Let's Login</h1>
      <p></p>

      <button className="btn btn-primary mx-3" onClick={handleLoginClick}>Login</button>
      <button className="btn btn-primary" onClick={handleSignupClick}>Sign-Up</button>
    </div>
  );
};
