import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ADMIN: Dashboard analytics
export const getAnalytics = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Delivered" }).populate("items.product");

    let totalSales = 0;
    let totalOrders = orders.length;

    const categorySales = {};
    const productSales = {};

    orders.forEach(order => {
      totalSales += order.totalAmount;

      order.items.forEach(item => {
        const category = item.product.category;
        const productName = item.product.name;

        // Category-wise sales
        categorySales[category] =
          (categorySales[category] || 0) + item.quantity * item.product.price;

        // Best-selling products
        productSales[productName] =
          (productSales[productName] || 0) + item.quantity;
      });
    });

    res.json({
      totalSales,
      totalOrders,
      categorySales,
      bestSellingProducts: productSales
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getLowStockProducts = async (req, res) => {
  const products = await Product.find({ stock: { $lt: 10 } });
  res.json(products);
};