import Order from "../models/Order.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      { $match: { status: "Delivered" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    const statusStats = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalOrders,
      totalRevenue,
      statusStats
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};