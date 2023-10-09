import {
  register,
  login,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
} from "../controllers/userController.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/forgotPasswordController.js";
import jwt from "jsonwebtoken";
import express from "express";

// const middleWare = (req, res,next) => {
//   let auth = req.headers.Authorization || req.headers.authorization;
//   let token = auth.split("")[1];
//   jwt.verify(token, process.env.JWT_SECURE, (error, response) => {
//     if (error) {
//       res.status(401).json({ message: error.message });
//     }
//     res.status(202).json({ message: "Token verified succesfully" });
//     next();
//   });
// };
const router = express();

//router.get("/user", getAllUsers);
router.get("/user/:id", getSingleUser);
router.post("/user/register", register);
router.post("/user/login", login);
router.put("/user/:id", updateSingleUser);
router.delete("/user/:id", deleteSingleUser);
router.post("/user/forgotPassword/:email", forgotPassword);
router.post("/user/resetPassword", resetPassword);

export default router;
