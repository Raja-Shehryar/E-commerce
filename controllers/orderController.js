import Order from "../models/orderModel.js";
import { create, getOrderByUserId } from "../services/orderServices.js";

const createOrder = async (req, res) => {
  try {
    const order = await create(req.body);
    if (order) {
      res.status(201).json({
        status: "Success",
        order,
      });
    }
  } catch (error) {
    res.status(401).json({ Error: error.message });
  }
};
// Check Out API
const orderOfSpecificUser = async (req, res) => {
  try {
    const userId = req.body;

    const orderOfUser = await getOrderByUserId(userId);
    res.status(200).json({ status: "success", orderOfUser });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

export { createOrder, orderOfSpecificUser };
