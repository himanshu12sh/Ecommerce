import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBasket,
  BadgePlus,
  ChartNoAxesCombined,
  X,
} from "lucide-react";

function Sidebar({ open, toggleSidebar }) {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/admin/dashboard",
    },
    {
      name: "Products",
      icon: <ShoppingBasket className="w-5 h-5" />,
      path: "/admin/products",
      badge: "New",
    },
    {
      name: "Orders",
      icon: <BadgePlus className="w-5 h-5" />,
      path: "/admin/orders",
    },
  ];

  return (
    <aside
      className={`fixed sm:static z-50 top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
    >
      <div className="flex justify-between items-center p-5 text-xl font-bold border-b border-gray-200">
        <div className="flex items-center gap-2">
          <ChartNoAxesCombined className="w-6 h-6" />
          Admin Panel
        </div>

        {/* Close button on mobile */}
        <button className="sm:hidden" onClick={toggleSidebar}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex flex-col px-4 py-4 space-y-1 ">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => open && toggleSidebar()} // close on mobile click
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition 
              ${isActive ? "bg-gray-100 text-blue-600 font-semibold" : "text-gray-700"}`}
            >
              {item.icon}
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
