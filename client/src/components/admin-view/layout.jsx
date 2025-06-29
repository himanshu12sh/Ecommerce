import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import { useState } from "react";

const Adminlayout = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar open={open} toggleSidebar={toggleSidebar} />

      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex flex-1 flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 flex bg-muted/40 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Adminlayout;
