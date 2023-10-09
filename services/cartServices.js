import Cart from "../models/cartModel.js";

// Create a new cart
const createCart = async (cartData) => {
  return await Cart.create(cartData);
};

// Get cart by user ID
const getCartByUserId = async (userId) => {
  return await Cart.findOne(userId)
    .populate({
      path: "userId",
      model: "Users",
      select: "-__v", // Populate the 'author' field // Select specific fields from the 'users' collection
    })
    .populate({
      path: "items.product",
      model: "Products",
      select: "-__v", // Populate the 'author' field // Select specific fields from the 'users' collection
    });
};

// Add item to cart
const addItemToCart = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ userId: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const existingItem = cart.items.find((item) => item.product == productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  return await cart.save();
};

// ... other cart service functions for update and delete ...

export default {
  createCart,
  getCartByUserId,
  addItemToCart,
  // ... other cart service functions ...
};
