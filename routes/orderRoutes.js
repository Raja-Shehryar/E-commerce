import { Router } from "express";
const router = Router();
import {
  createOrder,
  orderOfSpecificUser,
} from "../controllers/orderController.js";
router.post("/orders/create", createOrder);
router.get("/orders/getOrdersByUser", orderOfSpecificUser);

export default router;
