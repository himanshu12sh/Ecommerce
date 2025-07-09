import Products from "../../model/productSchema.js";

export const getProductFilter = async (req, res) => {
  try {
    const listOfProducts = await Products.find({});

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: listOfProducts,
    });
  } catch (error) {
    console.log("Errror in fetching", error);
    return res.status(500).json({
      success: false,
      message: "Server error while getting products",
    });
  }
};
