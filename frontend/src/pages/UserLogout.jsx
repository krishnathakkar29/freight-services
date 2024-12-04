import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";

function UserLogout() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/user/logout`, {
      withCredentials: true,
    })
    .then(({ data }) => {
      if (data.success === true) {
        setUser(null);
        navigate("/login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return <div>UserLogout</div>;
}

export default UserLogout;
