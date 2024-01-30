const Navbar = () => {
  return (
    <div className="w-full flex justify-center items-center py-2 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black relative">
        <p className=" text-3xl font-bold text-white ">PARKING</p>
        <p className="absolute right-8 text-white hover:text-violet-400 duration-300 ease-in-out "> About Us </p>
    </div>
  )
}

export default Navbar