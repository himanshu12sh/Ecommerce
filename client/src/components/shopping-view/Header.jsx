import { House, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function ShopHeader() {
  return (
    <div className="sticky top-0 w-full z-50 bg-white">
      <div className=" max-w-7xl mx-auto flex justify-between items-center h-16 px-4 ">
        <div className="flex items-center gap-2">
          <Link to="/shop/home" className="flex items-center gap-1 text-black">
            <House className="h-5 w-5" />
            <h2 className="text-xl font-bold">Shop</h2>
          </Link>
        </div>

        <ul className="flex gap-6">
          {["Home", "Kids", "Men", "Women", "Electronics", "Mobiles", "Footwear"].map((item) => (
            <li
              key={item}
              className="text-base text-gray-700 font-medium hover:underline hover:text-red-600 cursor-pointer transition-colors duration-200"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <ShoppingCart className="w-6 h-6 text-black cursor-pointer hover:text-red-600 transition" />
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
            <p className="text-sm font-semibold">H</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopHeader;
