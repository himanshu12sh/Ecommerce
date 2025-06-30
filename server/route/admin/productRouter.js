// routes/admin-view/adminRoutes.js
import express from "express";
import { upload } from "../../helper/multer.js";
import { addProduct, deleteProduct, editProduct, getAllProducts, getDatabyId } from "../../controller/admin-view/productsController.js";

const router = express.Router();

router.post("/add", upload.single("my_file"), addProduct);
router.get("/getAll", getAllProducts)
router.put('/edit/:id', editProduct)
router.delete("/delete/:id", deleteProduct)
router.get("/getDataById/:id", getDatabyId)
export default router;
