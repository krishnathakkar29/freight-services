import React from "react";

function LocationSearchPanel({ vehiclePanel, setVehiclePanel, setPanelOpen }) {
  const sampleLocations = [
    "24 , Mysore Cafe , Bandra",
    "24 , Mysore Cafe , Bandra",
    "24 , Mysore Cafe , Bandra",
    "24 , Mysore Cafe , Bandra",
  ];
  return (
    <div>
      {sampleLocations.map((item, index) => (
        <div
          key={index}
          className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between"
          onClick={() => {
            setVehiclePanel(true);
            setPanelOpen(false);
          }}
        >
          <h2 className="bg-[#eee] p-2 rounded-full w-12 h-8 flex items-center justify-center">
            <i className="ri-map-pin-fill "></i>
          </h2>
          <h4 className="font-medium">{item}</h4>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;
