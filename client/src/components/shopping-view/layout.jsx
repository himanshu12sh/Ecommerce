import { Outlet } from "react-router-dom";
import ShopHeader from "./Header";

const Shopinglayout = () => {
  return (
     <div className="flex min-h-screen w-full">
      
    
          <div className="flex flex-1 flex-col">
            <ShopHeader />
            <main className="flex-1 flex bg-muted/40 ">
              <Outlet />
            </main>
          </div>
        </div>
  );
};

export default Shopinglayout;
