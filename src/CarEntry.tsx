import Navbar from "./Navbar";

const CarEntry = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <div>
        <Navbar />
      </div>
      <div>
        <hr className="text-violet-500 py-0.2" />
      </div>
      <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r w-screen h-screen mr-10">
        <div className="pt-4 mr-10 flex justify-end">
          <p className="text-lg font-semibold text-white">Welcome, Owner</p>
        </div>

        <div>
            
        </div>

        
        {/* <div className="flex flex-col justify-center items-center absolute top-[50%] right-[35%] border-2 rounded-md px-10 py-6">
            <div className="grid grid-cols-2 ">
                <p className="text-white">Enter Car Reg Number</p>
                <input className="border-2 mb-2 border-gray-400 rounded-md p-1" type="text" />
                <p className="text-white">Enter Time of Entry</p>
                <input className="border-2 border-gray-400 rounded-md p-1" type="text" />
              </div>
          </div> */}
      </div>
    </div>
  );
};

export default CarEntry;
