import { logoutUser } from "@/store/auth-slice";
import { LogOut, Menu } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ toggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(resultAction)) {
        navigate("/auth/login");
      } else {
        console.error("Logout failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 shadow-sm px-6">
      <button
        onClick={toggleSidebar}
        className="sm:hidden p-2 rounded-md hover:bg-gray-100"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1"></div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
      >
        <p>Logout</p>
        <LogOut className="w-4 h-4" />
      </button>
    </header>
  );
}

export default Header;
