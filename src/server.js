import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import authRoutes from "./routes/auth.routes.js";
import authMiddleware from "./middleware/auth.js";
import adminMiddleware from "./middleware/admin.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import returnRoutes from "./routes/return.routes.js";
import walletRoutes from "./routes/wallet.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/returns", returnRoutes);
app.use("/wallet", walletRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/analytics", analyticsRoutes);

app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profile accessed",
    user: req.user
  });
});
app.get("/", (req, res) => {
  res.send("Fashion backend API running 🚀");
});
app.get("/test-user", async (req, res) => {
  const user = await User.create({
    name: "Test User",
    email: "test@example.com",
    password: "123456"
  });
  res.json(user);
});
app.get(
  "/admin-test",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({ message: "Welcome Admin 👑" });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
