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
import "remixicon/fonts/remixicon.css";
import Riding from "./pages/Riding";
import UserProtectWrapper from "./UserProtectWrapper";
import CaptainProtectWrapper from "./CaptainProtectWrapper";

function App() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isCaptainLoading, setIsCaptainLoading] = useState(true);

 

  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
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
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
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
