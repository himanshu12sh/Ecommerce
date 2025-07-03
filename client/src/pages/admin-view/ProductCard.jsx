import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductCard = ({ data, onDelete,setIsOpen, setCurrentEditedId ,setData}) => {

    const deleteProd = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4001/api/product/delete/${id}`);
      onDelete(id); 
      toast.success("Prodct Deleted !")
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const handleEdit = async (id) => {
    const response = await axios.get(
      `http://localhost:4001/api/product/getDataById/${id}`
    );
    
    console.log(response.data.data);
  };

  return (
    <>
      {data?.map((item, indx) => (
        <Card
          key={item._id || indx}
          className="hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-2">
            <img
              src={item?.image}
              alt="Product"
              className="w-full h-48 object-cover mb-4"
            />
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-2">
                {item.title || "Product Title"}
              </h3>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                {item.brand}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Rs {item.price}</span>
              <span className="text-xl font-bold">Stock-{item.stock}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <Button
                onClick={() =>setIsOpen(true)
                  && setCurrentEditedId(item?._id)
                  && setData(item?._id)&&
                  handleEdit(item?._id)
                }
              
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Edit
              </Button>
              <Button
                onClick={() => deleteProd(item._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}  
    </>
  );
};

export default ProductCard;
