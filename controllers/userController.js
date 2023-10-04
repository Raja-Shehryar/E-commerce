import Users from "../models/userModel.js";
// Creating new User
const createUser = async (req, res) => {
  try {
    const newUser = new Users(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating user" });
  }
};
//Getting data for all users
const getAllUsers = async (req, res) => {
  try {
    const User = await Users.find();
    res.json(User);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating user" });
  }
};
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await Users.findById(id);
    res.json(User);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error Getting single user" });
  }
};
// update data
const updateSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: "Got an Error in Catch Block" });
  }
};

//delete single record

const deleteSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({ message: "Successfully deleted User" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error found in catch block" });
  }
};

export {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
