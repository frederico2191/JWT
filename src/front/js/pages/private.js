import React from "react";
import { useNavigate } from "react-router-dom";
import PrivateContent from "../component/PrivateContent";

const PrivatePage = () => {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <button className="btn btn-primary mx-3" onClick={handleLogoutClick}>
        Log out
      </button>
      <PrivateContent />
    </div>
  );
};

export default PrivatePage;
