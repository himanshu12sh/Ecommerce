import { logoutUser } from "@/store/auth-slice";
import { House, Menu, ShoppingCart, UserRoundCog } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShopSidebar from "./ShopSidebar";

function ShopHeader() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const user = useSelector((state) => state.auth.user);
  // console.log("user---", user)
  // const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <>
      <div className="sticky top-0 w-full z-50 bg-white shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4">
          <Link
            to="/shoping/home"
            className="flex items-center gap-2 text-black"
          >
            <h2 className="text-xl font-bold">Shop</h2>
          </Link>

          <ul className="hidden lg:flex gap-6">
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
                to={item === "Home" ? "/shoping/home" : "/shoping/listing"}
                key={item}
                className="text-base text-gray-700 font-medium hover:underline hover:text-red-600 transition"
              >
                {item}
              </Link>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <ShoppingCart className="w-6 h-6 text-black hover:text-red-600 cursor-pointer" />
            <div className="relative">
              <div className="bg-black text-white px-4 py-2 rounded-full">
                <button onClick={() => setOpen(!open)}>Account</button>
              </div>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <div className="flex items-center gap-2 p-4 border-b">
                    <Link
                      to="/shoping/account"
                      className="flex items-center gap-2"
                    >
                      <UserRoundCog />
                      <p className="text-sm font-semibold text-gray-800">
                        {user?.userName || "Guest"}
                      </p>
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 📱 Hamburger for small screens */}
          <div className="lg:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* 🧩 Sidebar for small devices */}
      {sidebarOpen && (
        <ShopSidebar
          onClose={() => setSidebarOpen(false)}
          user={user}
          handleLogout={handleLogout}
          open={open}
        />
      )}
    </>
  );
}

export default ShopHeader;
