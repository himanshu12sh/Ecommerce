import Filter from "@/components/shopping-view/Filter";
import { sortOptions } from "@/store/auth-slice";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProductsShop from "./ProductsShop";
import axios from "axios";

function Listing() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/api/shop/getProductFilter"
      );
      setProduct(response?.data);
    } catch (error) {
      console.log("Error in Fetching Data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Filter />
      <div className="w-full">
        <div className=" p-4 bg-white shadow border border-b-gray-200  flex items-center justify-between ">
          <h2 className="text-lg font-semibold text-gray-800 ml-4">
            All Products
          </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="text-lg text-gray-400">10 Products</p>

            <div className="relative flex border p-2 mr-10">
              <ArrowUpDown className="w-5 h-5" />

              <button
                onClick={() => setOpen(!open)}
                className="text-sm font-medium"
              >
                Sort By
              </button>
            </div>
            {open && (
              <div className="absolute top-33 right-14 w-48 bg-white border rounded shadow-lg z-50">
                <ul>
                  {sortOptions?.map((sort, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {sort?.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductsShop product={product} />
        </div>
      </div>
    </>
  );
}

export default Listing;
