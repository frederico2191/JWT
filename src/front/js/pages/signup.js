import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import SignupForm from "../component/SignupForm";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const registration = await actions.signup({ email, password });
    console.log("result from sign up registrsation::", registration);
    console.log("fetch attempted to sign up email: ", email);
    console.log("fetch attempted to sign up password: ", password);
    if (registration == "400") alert("user already exists");
    if (registration == "200") navigate("/login");
  };
  return <SignupForm />;
};
