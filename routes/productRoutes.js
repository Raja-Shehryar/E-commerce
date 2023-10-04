import { Router } from "express";
const router = Router();
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

// Create a new product
router.post("/products", createProduct);

// Get a list of all products
router.get("/products", getAllProducts);

// Get a single product by ID
router.get("/products/:id", getProductById);

// Update a product by ID
router.put("/products/:id", updateProduct);

// Delete a product by ID
router.delete("/products/:id", deleteProduct);

export default router;
