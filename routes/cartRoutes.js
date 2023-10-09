import { Router } from "express";
import {
  createCart,
  getCartByUserId,
  addItemToCart,
} from "../controllers/cartController.js";
const router = Router();
router.post("/cart/createCart", createCart);
router.post("/cart/addItems", addItemToCart);
router.post("/cart/getCart", getCartByUserId);

// router.get("/orders/:id", orderOfSpecificUser);

export default router;
