import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

function CaptainLogout() {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/captain/logout`, {
      withCredentials: true,
    })
    .then(({ data }) => {
      if (data.success === true) {
        setCaptain(null);
        navigate("/captain-login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return <div>CaptainLogout</div>;
}

export default CaptainLogout;
