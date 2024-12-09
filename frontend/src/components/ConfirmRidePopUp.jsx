import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfirmRidePopUp({ setRidePopupPanel, setConfirmRidePopupPanel }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHander = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          setRidePopupPanel(false);
          setConfirmRidePopupPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3">
        Confirm this ride to Start
      </h3>
      <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">fullna</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-1 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">.pickup</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">destination</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹ride?.fare </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-2 w-full">
          <form onSubmit={submitHander}>
            <input
              type="text"
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full "
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={() => {
                navigate("/captain-riding");
              }}
              className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold px-3 py-1 rounded-lg"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setConfirmRidePopupPanel(false);
                setRidePopupPanel(false);
              }}
              className="w-full mt-2 bg-red-600 text-lg text-white font-semibold px-3 py-1 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmRidePopUp;
