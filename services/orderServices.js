import Order from "../models/orderModel.js";

// Create a new order
export const create = async (orderData) => {
  return await Order.create(orderData);
};

// Get orders by user ID
export const getOrderByUserId = async (userId) => {
  return await Order.findOne(userId)
    .populate({
      path: "userId",
      model: "Users",
      select: "-__v", // Populate the 'author' field // Select specific fields from the 'users' collection
    })
    .populate({
      path: "items.productId",
      model: "Products",
      select: "-__v", // Populate the 'author' field // Select specific fields from the 'users' collection
    });
};

// ... other order service functions for update and delete ...
