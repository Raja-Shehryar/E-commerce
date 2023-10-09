import Users from "../models/userModel.js"; // Assuming you have a User model
import { compare, hash } from "bcrypt";

// Controller function to update the user's password
const updatePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Find the user by their ID
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the current password
    const passwordMatch = await compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default updatePassword;
