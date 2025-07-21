import Filter from "@/components/shopping-view/Filter";
import { sortOptions } from "@/store/auth-slice";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProductsShop from "./ProductsShop";
import axios from "axios";

function Listing() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState();

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  const handleSort = (value) => {};

  function handleFilter(getSectionId, getCurrentOption) {
    
      let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    console.log("-----", cpyFilters);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/api/shop/getProductFilter"
      );
      setProduct(response?.data);
      // console.log("products number---",response?.data)
    } catch (error) {
      console.log("Error in Fetching Data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Filter filter={filters} handleFilter={handleFilter} />
      <div className="w-full">
        <div className=" p-4 bg-white shadow border border-b-gray-200  flex items-center justify-between ">
          <h2 className="text-lg font-semibold text-gray-800 ml-4">
            All Products
          </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="text-lg text-gray-400">
              {product?.products?.length} Products
            </p>

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
              <div className="absolute top-[33px] right-14 w-48 bg-white border rounded shadow-lg z-50">
                <ul>
                  {sortOptions?.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSort(option.value);
                        handleSort(option.value);
                        setOpen(false); // close dropdown after selection
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                        sort === option.value ? "bg-gray-100 font-semibold" : ""
                      }`}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="">
          <ProductsShop product={product} />
        </div>
      </div>
    </>
  );
}

export default Listing;
