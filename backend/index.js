import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDatabase from "./src/databases/database.js";
import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import productRoute from "./src/routes/product.route.js";
import cartRoute from "./src/routes/cart.route.js";
import wishlistRoute from "./src/routes/wishlist.route.js";
import orderRoute from "./src/routes/order.route.js";

dotenv.config();

const app = express();

connectDatabase();

app.use(cors());

app.use(express.json());

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/wishlist", wishlistRoute);
app.use("/orders", orderRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});