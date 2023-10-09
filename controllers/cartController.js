import cartService from "../services/cartServices.js";

// Create a new cart
export const createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart(req.body);
    res.status(201).json({ status: "success", cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

// Get cart by user ID
export const getCartByUserId = async (req, res) => {
  try {
    const userId = req.body;
    const cart = await cartService.getCartByUserId(userId);
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

// Add item to cart
export const addItemToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await cartService.addItemToCart(userId, productId, quantity);
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

// ... other cart controller functions for update and delete ...

// export default {
//   createCart,
//   getCartByUserId,
//   addItemToCart,
//   // ... other cart controller functions ...
// };
