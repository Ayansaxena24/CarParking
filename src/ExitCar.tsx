// ExitCar.tsx
import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { vacateParkingSpace } from "./redux/actions/ParkActions";

interface ExitCarProps {
  // carRegistration: string;
  // chargeAmount: number;
//   deallocateSpace: () => void;
}

const ExitCar: React.FC<ExitCarProps> = ({
//   deallocateSpace,
}) => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate("/");
  };


  const handlePaymentTaken = () => {
    // Make a POST request to the specified endpoint with car registration and charge amount
    fetch("https://httpstat.us/200", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "car-registration": location.state.space.registrationNumber,
        charge: finalCharge,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Payment taken successfully!");
          // Deallocate the parking space after successful payment
          const spaceId = location.state.space.id;
          dispatch(vacateParkingSpace(spaceId));
          navigate("/");
        } else {
          alert("Error processing payment. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  const inTime = location.state.space.inTime;
  
  const calculateCharge = () => {
    const currentTime = new Date();
  
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
  
    const inTimeDate = new Date(`2000-01-01 ${inTime}`);
    const inTimeHours = inTimeDate.getHours();
    const inTimeMinutes = inTimeDate.getMinutes();

    let diffHours = currentHours - inTimeHours;
    if (currentMinutes >= inTimeMinutes) diffHours += 1;
    const chargeAmount = diffHours<=2 ? 10 : (diffHours-2)*20 + 10;
    return chargeAmount;
  }

  const finalCharge = calculateCharge();
  
  

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div className="w-full z-20">
        <Navbar />
      </div>
      <div className="w-full flex h-screen absolute top-0 flex-col justify-center items-center bg-gradient-to-t from-slate-900 via-purple-900 to-slate-900">
        <div className="w-fit rounded-md py-6 px-10 bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r text-white">
          <p className="text-4xl font-semibold mb-8">
            Parking Charges
          </p>
          <Typography variant="body1" gutterBottom>
            Car Registration: {location.state.space.registrationNumber}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Charge Amount: ${finalCharge}
          </Typography>
          <div className="mt-4 flex justify-between w-full">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePaymentTaken}
            >
              Payment Received
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginLeft: "10px" }}
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitCar;
