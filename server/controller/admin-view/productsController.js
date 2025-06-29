import Products from "../../model/productSchema.js";
import { uploadImage } from "../../helper/cloudinary.js";

/**
 * Add a new product and upload image to Cloudinary
 * Accepts multipart/form-data with fields:
 * - my_file (image)
 * - title, desc, brand, category, price, salePrice, stock
 */
export const addProduct = async (req, res) => {
  try {
    const {
      title,
      desc,
      brand,
      category,
      price,
      salePrice,
      stock,
    } = req.body;

    // Check for required fields
    if (!req.file || !title || !desc || !price || !stock) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Convert file buffer to base64 data URL
    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const dataUrl = `data:${req.file.mimetype};base64,${base64}`;

    // Upload image to Cloudinary
    const uploadResult = await uploadImage(dataUrl);
    const imageUrl = uploadResult.secure_url;

    // Check for existing product
    const existingProduct = await Products.findOne({
      title: title.trim(),
      brand,
      category,
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with the same title, brand, and category already exists",
      });
    }

    // Create new product
    const newProduct = new Products({
      image: imageUrl,
      title: title.trim(),
      desc,
      brand,
      category,
      price,
      salePrice,
      stock,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });

  } catch (error) {
    console.error("Product creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding product",
    });
  }
};



export const getAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Products.find({});

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: listOfProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while getting products",
    });
  }
};


export const editProduct = async(req, res)=>{
  const {id}= req.params
  try {
    const existProduct= await Products.findById(id)
    if(!existProduct){
      return res.status(404).json({
    success: false,
    message: "Product not found",
  });
    }

    const updatedProd= await Products.findByIdAndUpdate(id, req.body,{
      new:true,
      runValidators:true
    })

    return res.status(200).json({
  success: true,
  message: "Product updated successfully",
  product: updatedProd,
});
  } catch (error) {
     console.error("Error in Editing products:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while editing products",
    });
  }
}


export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Products.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};
