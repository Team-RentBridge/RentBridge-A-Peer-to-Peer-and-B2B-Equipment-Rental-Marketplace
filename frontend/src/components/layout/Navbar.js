import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <div className="w-full shadow-md">

      {/* TOP NAV */}
      <div className="bg-[#131921] text-white px-6 py-3 flex items-center gap-6">

        {/* LOGO */}
        <h1 className="text-xl font-bold cursor-pointer">
          RentBridge
        </h1>

        {/* LOCATION */}
        <div className="text-sm cursor-pointer">
          <p className="text-gray-300 text-xs">Deliver to</p>
          <p className="font-semibold">Aligarh</p>
        </div>

        {/* SEARCH BAR */}
        <div className="flex flex-1 max-w-3xl">

          {/* CATEGORY SELECT */}
          <select className="bg-gray-200 text-black px-2 rounded-l-md outline-none">
            <option>All</option>
            <option>Electronics</option>
            <option>Tools</option>
            <option>Machinery</option>
          </select>

          {/* INPUT */}
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-3 py-2 outline-none text-black"
          />

          {/* SEARCH BUTTON */}
          <button className="bg-yellow-400 px-4 rounded-r-md hover:bg-yellow-500">
            <FaSearch />
          </button>
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-2 cursor-pointer hover:underline">
          <FaUser />
          <span className="text-sm">Profile</span>
        </div>

        {/* CART */}
        <div className="flex items-center gap-2 cursor-pointer hover:underline">
          <FaShoppingCart />
          <span className="text-sm">Cart</span>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div className="bg-[#232F3E] text-white px-6 py-2 flex gap-6 text-sm overflow-x-auto">

        <span className="cursor-pointer hover:underline">All</span>
        <span className="cursor-pointer hover:underline">Electronics</span>
        <span className="cursor-pointer hover:underline">Tools</span>
        <span className="cursor-pointer hover:underline">Machinery</span>
        <span className="cursor-pointer hover:underline">Furniture</span>
        <span className="cursor-pointer hover:underline">Vehicles</span>
        <span className="cursor-pointer hover:underline">Heavy Equipment</span>

      </div>
    </div>
  );
}

export default Navbar;