import express from "express";
import { protect } from "../middleware/auth.js";
import { scanProduct } from "../controllers/product-scan.controller.js";

const router = express.Router();
router.use(protect);
router.post("/", scanProduct);

export default router;
