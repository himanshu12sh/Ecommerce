import { Link } from "react-router-dom";
import { X, ShoppingCart, UserRoundCog } from "lucide-react";

function ShopSidebar({ onClose, user, handleLogout }) {
  return (
   <aside
      className={`fixed top-0 left-0 z-50 h-screen w-48 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full"} sm:hidden`}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white flex items-center justify-between px-5 py-4 border-b shadow-sm z-10">
        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav Links */}
      <div className="px-5 py-4 overflow-y-auto h-[calc(100vh-180px)]">
        <ul className="flex flex-col gap-4">
          {[
            "Home",
            "Kids",
            "Men",
            "Women",
            "Electronics",
            "Mobiles",
            "Footwear",
          ].map((item) => (
            <Link
              to={item==="Home"? "/shoping/home":"/shoping/listing"}
              key={item}
              onClick={onClose}
              className="text-base text-gray-700 font-medium hover:text-red-600 hover:pl-1 transition-all"
            >
              {item}
            </Link>
          ))}
        </ul>

        {/* Cart */}
        <div className="flex items-center gap-3 mt-8">
          <ShoppingCart className="w-5 h-5 text-gray-700" />
          <p className="text-sm font-medium text-gray-800">Cart</p>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200">
          <UserRoundCog className="w-5 h-5 text-gray-700" />
          <p className="text-sm font-semibold text-gray-800">
            {user?.userName || "Guest"}
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            handleLogout();
            onClose();
          }}
          className="mt-4 w-full text-left text-sm text-red-600 hover:bg-gray-100 px-3 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default ShopSidebar;
