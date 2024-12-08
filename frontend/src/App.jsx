import { useContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./Start";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserDataContext } from "./context/userContext";
import UserProtectProvider from "./UserProtectProvider";
import UserLogout from "./pages/UserLogout";
import axios from "axios";
import CaptainHome from "./pages/CaptainHome";
import { CaptainDataContext } from "./context/CaptainContext";
import CaptainLogout from "./pages/CaptainLogout";

function App() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isCaptainLoading, setIsCaptainLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/user/getmyprofile`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        if (data.success === true) {
          setUser(data.user);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setUser(null);
      });
  }, [user, setUser]);

  useEffect(() => {
    setIsCaptainLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/captain/profile`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        if (data.success === true) {
          setCaptain(data.user);
          setIsCaptainLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsCaptainLoading(false);
        setCaptain(null);
      });
  }, [captain, setCaptain]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            // <UserProtectProvider user={user} redirect="/login">
            <Home />
            // </UserProtectProvider>
          }
        />
        <Route
          path="/user/logout"
          element={
            // <UserProtectProvider user={user} redirect="/login">
            <UserLogout />
            // </UserProtectProvider>
          }
        />
        <Route
          path="/captain-home"
          element={
            // <UserProtectProvider user={captain} redirect="/captain-login">
            <CaptainHome />
            // </UserProtectProvider>
          }
        />
        <Route
          path="/captain/logout"
          element={
            // <UserProtectProvider user={captain} redirect="/captain-login">
            <CaptainLogout />
            // </UserProtectProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
