import express from "express";
import { getProductFilter } from "../../controller/shop/productFilterController";

const router = express.Router();
router.get("/getProductFilter", getProductFilter)
export default router;
