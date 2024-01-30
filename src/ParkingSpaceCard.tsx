// ParkingSpaceCard.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { allocateParkingSpace } from "../src/redux/actions/ParkActions";
import { useNavigate } from "react-router-dom";

interface ParkingSpaceCardProps {
  space: {
    id: number;
    occupied: boolean;
    registrationNumber?: string;
    inTime?: string;
    chargeAmount?: number;
  };
  onClick: () => void;
}

const ParkingSpaceCard: React.FC<ParkingSpaceCardProps> = ({ space }) => {
  const dispatch = useDispatch();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [inTime, setInTime] = useState("");
  const navigate = useNavigate();

  
  const handleCardClick = () => {
    console.log("aqwqwqwqqwwqwwwq")
    if (!space.occupied) handleAddCar();
    else navigate(`/vacate/${space.id}`, { state: { space } });
    ;
  };

  const handleAddCar = () => {
    if (registrationNumber && inTime) {
      dispatch(allocateParkingSpace(space.id, registrationNumber, inTime));
      setRegistrationNumber("");
      setInTime("");
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="hover:bg-gradient-to-l hover:from-gray-700 hover:via-gray-900 hover:to-black border-2 rounded-md pl-2 text-white bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"
    >
      <div onClick={() => handleCardClick}>
        {space.occupied ? (
          <div className="py-8 space-y-2">
            <strong>Parking Space {space.id}</strong>
            <div>
              <p className="text-red-300">Occupied</p>
              <p>Registration Number: {space.registrationNumber}</p>
              <p>In Time: {space.inTime}</p>
            </div>
          </div>
        ) : (
          <div className="min-h-[25vh] p-1 flex flex-col justify-center items-center w-full space-y-2">
            <strong>Parking Space {space.id}</strong>
            <p className="text-green-300">Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingSpaceCard;
