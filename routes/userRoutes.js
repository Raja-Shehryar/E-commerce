import {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
} from "../controllers/userController.js";
import express from "express";

const router = express();

router.get("/user", getAllUsers);
router.get("/user/:id", getSingleUser);
router.post("/user", createUser);
router.put("/user/:id", updateSingleUser);
router.delete("/user/:id", deleteSingleUser);

export default router;
