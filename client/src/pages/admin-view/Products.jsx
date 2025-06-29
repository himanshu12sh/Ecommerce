import { useRef, useState } from "react";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin-view/ImageUpload";
import { useDispatch } from "react-redux";
import {
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
} from "@/store/admin/product-slice";
import axios from "axios";
import { toast } from "sonner";
import ProductCard from "./ProductCard";

function Products() {
  const sidebarRef = useRef();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const openSidebar = () => {
    setIsOpen(true);
    gsap.fromTo(
      sidebarRef.current,
      { x: "100%" },
      { x: 0, duration: 0.8, ease: "power3.out" }
    );
  };

  const closeSidebar = () => {
    gsap.to(sidebarRef.current, {
      x: "100%",
      duration: 0.8,
      ease: "power3.in",
      onComplete: () => setIsOpen(false),
    });
  };

  const titleRef = useRef();
  const descriptionRef = useRef();
  const brandRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const saleRef = useRef();
  const stockRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please upload an image");
      return;
    }

    const productData = new FormData();
    productData.append("my_file", imageFile);
    productData.append("title", titleRef.current.value);
    productData.append("desc", descriptionRef.current.value);
    productData.append("brand", brandRef.current.value);
    productData.append("category", categoryRef.current.value);
    productData.append("price", priceRef.current.value);
    productData.append("salePrice", saleRef.current.value);
    productData.append("stock", stockRef.current.value);

    try {
      dispatch(fetchProductsStart());
      const res = await axios.post(
        "http://localhost:4001/api/product/add",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        dispatch(fetchProductsSuccess([res.data.product]));
        setImageFile(null);
        setUploadedImageUrl(null);
        toast.success("Product added successfully!");
        closeSidebar();
      } else {
        dispatch(fetchProductsFailure("Failed to add product"));
        toast.error("Failed to add product");
      }
    } catch (err) {
      console.error("Upload error:", err);
      dispatch(fetchProductsFailure(err.message));
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-end">
        <button
          onClick={openSidebar}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>
      {/* ProductCard component added here */}
      <div className=" mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

        <ProductCard />
      </div>
      </div>
      {isOpen && (
        <>
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={closeSidebar}
          ></div>

          {/* Sidebar */}
          <aside
            ref={sidebarRef}
            className="fixed top-0 right-0 z-50 h-screen w-full max-w-md bg-white border-l border-gray-200 shadow-xl"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Add New Product
              </h2>
              <button onClick={closeSidebar}>
                <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-6 py-4 space-y-5 overflow-y-auto h-full pb-24"
            >
              <ImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isEditMode={currentEditedId !== null}
              />
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-sm mb-1 block">
                  Product Title
                </Label>
                <Input
                  id="title"
                  ref={titleRef}
                  name="title"
                  type="text"
                  placeholder="Enter product title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm mb-1 block">
                  Description
                </Label>
                <Textarea
                  id="description"
                  ref={descriptionRef}
                  name="description"
                  placeholder="Enter product description"
                  required
                  rows={4}
                />
              </div>

              {/* Brand */}
              <div>
                <Label htmlFor="brand">Brand</Label>
                <select
                  id="brand"
                  name="brand"
                  ref={brandRef}
                  required
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Select Brand</option>
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                  <option value="Zara">Zara</option>
                </select>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  ref={categoryRef}
                  required
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Select Category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div>
                <Label htmlFor="price" className="text-sm mb-1 block">
                  Price
                </Label>
                <Input
                  ref={priceRef}
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter product price"
                  required
                />
              </div>
              <div>
                <Label htmlFor="sale" className="text-sm mb-1 block">
                  Sale Price{"(Optional)"}
                </Label>
                <Input
                  ref={saleRef}
                  id="sale"
                  name="sale"
                  type="text"
                  placeholder="Enter product sale price"
                />
              </div>
              <div>
                <Label htmlFor="stock" className="text-sm mb-1 block">
                  Total stock
                </Label>
                <Input
                  ref={stockRef}
                  id="stock"
                  name="stock"
                  type="stock"
                  placeholder="Enter total stock "
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Save Product
                </button>
              </div>
            </form>
          </aside>
        </>
      )}
    </div>
  );
}

export default Products;
