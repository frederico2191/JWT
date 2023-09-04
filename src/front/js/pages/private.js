import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrivateContent from "../component/PrivateContent";

const PrivatePage = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    token && token != "" && token !== undefined ? (
      <PrivateContent></PrivateContent>
    ) : (
      (console.log("gotta move 8888"), navigate("/login"))
    );
  });
  return (
    <div>
      <button className="btn btn-primary mx-3" onClick={handleLogoutClick}>
        Log out
      </button>
    </div>
  );
};

export default PrivatePage;
