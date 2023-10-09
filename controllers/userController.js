import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//register with auth
const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      isAdmin,
      address,
      profilePicture,
      email,
      phoneNumber,
      password,
    } = req.body;
    const userExist = await Users.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "user already exists" });
    }
    const hashPassword = bcrypt.hash(password, 10);
    const newUser = Users({
      firstName,
      lastName,
      isAdmin,
      address,
      profilePicture,
      email,
      phoneNumber,
      password: (await hashPassword).toString(),
    });
    const savedUser = await newUser.save();
    res
      .status(200)
      .json({ savedUser, message: "user successfully registered" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//login with auth
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECURE,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "login successfully" });
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
};
// // Creating new User
// const createUser = async (req, res) => {
//   try {
//     const newUser = new Users(req.body);
//     const savedUser = await newUser.save();
//     res.json(savedUser);
//   } catch (err) {
//     res.status(500).json({ error: "Error creating user" });
//   }
// };
// //Getting data for all users
// const getAllUsers = async (req, res) => {
//   try {
//     const User = await Users.find();
//     res.json(User);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error creating user" });
//   }
// };
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

export { register, login, getSingleUser, updateSingleUser, deleteSingleUser };
