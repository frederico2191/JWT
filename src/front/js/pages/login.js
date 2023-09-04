import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import LoginForm from "../component/LoginForm";

export const Login = (props) => {
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem("token");

  return (
    <div className="text-center">
      <h1>Login</h1>
      {token && token != "" && token != undefined ? (
        "You are logged in with this token:" + token
      ) : (
        <LoginForm></LoginForm>
      )}
    </div>
  );
};
