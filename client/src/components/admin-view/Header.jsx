import { LogOut, Menu } from "lucide-react";
import React from "react";

function Header({ toggleSidebar }) {
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 shadow-sm px-6">
      {/* Menu icon - visible only on small screens */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden p-2 rounded-md hover:bg-gray-100"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Spacer to push logout button to right */}
      <div className="flex-1"></div>

      {/* Logout button aligned right */}
      <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
        <p>Logout</p>
        <LogOut className="w-4 h-4" />
      </button>
    </header>
  );
}

export default Header;
