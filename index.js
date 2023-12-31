import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import UserRouter from "./routes/userRoutes.js";
import ProducrRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB database");
});
app.use(bodyParser.json());
app.use("/api", UserRouter);
app.use("/api", ProducrRouter);
app.use("/api", orderRouter);
app.use("/api", cartRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
