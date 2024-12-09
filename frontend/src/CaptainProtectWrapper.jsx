import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "./context/CaptainContext";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/captain/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setIsLoading(false);
          navigate("/captain-home");
        }
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
