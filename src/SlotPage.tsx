import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  setParkingSpaces,
  allocateParkingSpace,
  saveState,
  setParkingSpacesArray,
} from "./redux/actions/ParkActions";
import ParkingSpaceCard from "./ParkingSpaceCard";
import { Modal } from "@mui/material";
import { findAvailableSpace } from "./redux/reducers/ParkReducers";
// import store from "./redux/Store";

const SlotPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const parkingSpaces = useSelector((state: any) => state.parkingSpaces);
  const [inputValue, setInputValue] = useState<number>(1);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [inTime, setInTime] = useState("");
  const [selectedSpace, setSelectedSpace] = useState<any>(null);

  const dispatch = useDispatch();
  const spaces = useSelector((state: any) => state.parkingSpaces);

  const handleRandomSubmit = () => {
    const availableSpaceID = findAvailableSpace(parkingSpaces);
    if (availableSpaceID !== null) {
      handleOpenModal(availableSpaceID);
    }
    else {
      alert("No available spaces. Please try again later.");
    }
  }

  const handleChange = (e: any) => {
    const regex =/^(?=.*[1-9])\d+$/;
    const trimmedValue = e.target.value.trimStart();
    if ((trimmedValue === "" || regex.test(trimmedValue)) && trimmedValue!==0)
    setInputValue(Number(e.target.value));
  }

  const handleSubmit = (spaces: number) => {
    dispatch(setParkingSpaces(spaces));
    dispatch(saveState(spaces));
    setSubmitted(true);
  };

  const handleOpenModal = (space: number) => {
    setSelectedSpace(space);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Check if saved state exists in localStorage
    const savedState = localStorage.getItem("parkingAppState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      console.log("parsedState==>>", parsedState);
      dispatch(
        setParkingSpaces(
          parsedState.parkingSpaces.length,
          parsedState.parkingSpaces
        )
      );
      dispatch(setParkingSpacesArray(parsedState.parkingSpaces));
    }
  }, [dispatch]);

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setInTime(new Date().toLocaleTimeString());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const handleModalSubmit = () => {
    const registrationPattern =
      /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
    if (registrationNumber.trim() !== "" && inTime.trim() !== "") {
      if (!registrationPattern.test(registrationNumber)) {
        alert("Please enter a valid registration number. \nEXAMPLE-> TN 01 AB 1234");
        return;
      }

      dispatch(allocateParkingSpace(selectedSpace, registrationNumber, inTime));
      setIsModalOpen(false);
      const currentTime = new Date().toLocaleTimeString();
      setInTime(currentTime);
      setSubmitted(true);
      // Save the updated state to localStorage
      dispatch(saveState(selectedSpace));
    } else {
      alert("Please enter valid registration number. \nEXAMPLE-> TN 01 AB 1234");
    }
  };

  const clearLocalStorageAndRestart = () => {
    try {
      // Clear localStorage
      localStorage.removeItem("parkingAppState"); // Use the same key you used for storing state
      window.location.reload();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  // Button click handler
  const handleClearLocalStorageClick = () => {
    clearLocalStorageAndRestart();
  };

  return (
    <div className="w-full h-full ">
      <div>
        <Navbar />
      </div>
      <div>
        <hr className="text-violet-500 py-0.2" />
      </div>
      <div
        className={`bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r mr-10 w-screen h-fit ${ submitted ? " h-fit" : "h-screen" }`}
      >
        <div className="sm:pt-4 pt-1 mb-4 sm:mb-0 sm:mr-10 mr-2 flex justify-end">
          <p className="text-lg font-semibold text-white">Welcome, Owner</p>
        </div>

        {submitted === false && spaces <= 0 ? (
          <div className="flex flex-col justify-center items-center absolute top-[40%] mx-2 sm:mx-0 sm:top-[50%] sm:right-[30%] border-2 rounded-md px-10 py-6">
            <div className="grid grid-cols-2 space-x-2">
              <p className="text-white mt-1">
                Enter required number of Parking Spaces
              </p>
              <input
                className="border-2 mb-2 border-gray-400 bg-gray-200 rounded-md p-1"
                type="text"
                value={inputValue}
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <button disabled={inputValue === 0}
                
                  className={`text-white rounded-lg border-2 px-2 py-1 ${inputValue === 0 ? "border-gray-600 text-gray-600" : "hover:shadow-lg hover:shadow-violet-400 duration-300 ease-in-out hover:border-violet-400 "}`}
                  onClick={() => {
                    handleSubmit(inputValue);
                    setSubmitted(true);
                  }}
                >
                  Submit
                
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="flex space-x-2">
              <button
                className="text-white mb-2 bg-green-600 rounded-lg hover:shadow-lg hover:shadow-green-400 duration-300 ease-in-out hover:border-green-400 px-2 py-1"
                onClick={handleClearLocalStorageClick}
              >
                Restart Session
              </button>
              <button
                className="text-white mb-2 bg-green-600 rounded-lg hover:shadow-lg hover:shadow-green-400 duration-300 ease-in-out hover:border-green-400 px-2 py-1"
                onClick={handleRandomSubmit}
              >
                Allocate any Available Space
              </button>
            </div>
            <div className="w-full grid space-x-1 space-y-1 z-50 sm:grid-cols-4 grid-cols-2 justify-center items-center min-h-[100vh] absolute top-30 -z-10 bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r">
              {parkingSpaces.map((space: any) => (
                <div onClick={() => handleOpenModal(space.id)}>
                  <ParkingSpaceCard
                    key={space.id}
                    space={space}
                    onClick={() => handleOpenModal(space.id)}
                  />
                </div>
              ))}
            </div>

            <Modal
              open={isModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="w-full h-full flex justify-center items-center text-white">
                <div className="relative bg-gray-900 sm:w-1/3 sm:h-1/3 px-2 py-2 sm:px-0 sm:py-0 rounded-md flex flex-col justify-center items-center">
                  <button
                    className="absolute right-3 top-1 hover:rounded-md hover:px-2 hover:bg-red-600 duration-300 ease-in-out"
                    onClick={handleCloseModal}
                  >
                    X
                  </button>
                  <div className="flex flex-col mt-6 sm:mt-0 justify-start sm:space-y-0 space-y-2 sm:flex sm:flex-row space-x-2 sm:justify-center sm:items-center">
                    <label htmlFor="registrationNumber" className="ml-2">
                      Registration Number :
                    </label>
                    <input
                      className="bg-gray-400 rounded-lg text-black pl-1 "
                      type="text"
                      id="registrationNumber"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="flex flex-col pl-2 sm:pl-0 sm:flex sm:flex-row justify-between w-full">
                    <p></p>
                    <label htmlFor="inTime">Vehicle Entry Time :</label>
                    <p className="text-white"> {inTime}</p>
                    <p></p>
                  </div>
                  <br />
                  <div className="w-full flex justify-center items-center mb-2 sm:mb-0">
                    <button
                      className="rounded-2xl duration-300 ease-in-out hover:shadow-lg hover:shadow-violet-400 hover:border-violet-400 border-2 px-2 py-1"
                      onClick={handleModalSubmit}
                    >
                      Add Car
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotPage;
